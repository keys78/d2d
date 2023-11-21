<template>
    <div class="flex items-center justify-center py-3">
        <div class="max-w-[400px]">
            <canvas id="myChart"></canvas>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
    filteredTransactions: {
        type: Array,
        required: true,
    },
});

let myChartInstance = null;

const updateChart = () => {
    const categories = {};
    props.filteredTransactions.forEach(transaction => {
        if (!categories[transaction.category]) {
            categories[transaction.category] = { income: 0, expense: 0 };
        }
        const type = transaction.type === 'income' ? 'income' : 'expense';
        categories[transaction.category][type] += transaction.amount;
    });

    const chartData = {
        labels: Object.keys(categories),
        datasets: [
            {
                label: 'Income',
                data: Object.values(categories).map(cat => cat.income),
                backgroundColor: 'rgba(56, 211, 38, 0.2)',
                borderColor: 'rgba(56, 211, 38)',
                pointBorderColor: 'rgba(56, 211, 38)',
                borderWidth: 1,
                fill: true,
            },
            {
                label: 'Expense',
                data: Object.values(categories).map(cat => cat.expense),
                backgroundColor: 'rgba(211, 38, 38, 0.2)',
                borderColor: 'rgba(211, 38, 38)',
                pointBorderColor: 'rgba(211, 38, 38)',
                borderWidth: 1,
                fill: true,
            },
        ],
    };

    const ctx = document.getElementById('myChart');
    if (myChartInstance) {
        myChartInstance.data = chartData; // Update chart data
        myChartInstance.update(); // Update the chart
    } else {
        if (ctx) {
            myChartInstance = new Chart(ctx, {
                type: 'radar',
                data: chartData,
                options: {
                    elements: {
                        line: {
                            borderWidth: 3
                        }
                    },
                    scales: {
                        r: {
                            grid: {
                                color: [
                                    'hsl(252, 2%, 81%)'
                                ]
                                // color: [
                                //     'rgba(0, 0, 0, 0.5)', 
                                //     'rgba(255, 0, 0, 0.5)', // Red
                                //     'rgba(255, 165, 0, 0.5)', // Orange
                                //     'rgba(255, 255, 0, 0.5)', // Yellow
                                //     'rgba(0, 128, 0, 0.5)', // Green
                                //     'rgba(0, 0, 255, 0.5)', // Blue
                                //     'rgba(75, 0, 130, 0.5)' // Indigo
                                // ]
                            }
                        }
                    }

                },
            });
        }
    }
};

onMounted(() => {
    updateChart();
});

watch(() => props.filteredTransactions, () => {
    updateChart();
});
</script>

<style></style>
