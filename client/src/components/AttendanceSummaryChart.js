import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Paper, Typography } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AttendanceSummaryChart = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'x-auth-token': token,
                    },
                };
                const response = await axios.get('http://localhost:5000/api/attendance/summary', config);
                const summary = response.data;

                if (summary && summary.length > 0) {
                    const labels = summary.map(item => new Date(item._id).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }));
                    const data = summary.map(item => item.count);
                    setChartData({
                        labels,
                        datasets: [{
                            label: 'Students Present',
                            data,
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                            borderColor: 'rgba(53, 162, 235, 1)',
                            borderWidth: 1,
                        }],
                    });
                }
            } catch (error) {
                console.error("Failed to fetch summary data", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSummary();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Daily Attendance Summary', font: { size: 16 } },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 1 }
            }
        }
    };

    return (
        <Paper sx={{ p: 3, mt: 4, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)' }}>
            {isLoading ? (
                <Typography>Loading Chart...</Typography>
            ) : chartData.labels.length > 0 ? (
                <Bar options={options} data={chartData} />
            ) : (
                <Typography>No attendance data available to display.</Typography>
            )}
        </Paper>
    );
};

export default AttendanceSummaryChart;