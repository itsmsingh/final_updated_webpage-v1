document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("regressionChart").getContext("2d");
    let chart;

    function generateData(type) {
        let data = [];
        let labels = [];
        for (let i = 0; i <= 10; i++) {
            let x = i;
            let y;
            if (type === "linear") {
                y = 2 * x + 1;
            } else if (type === "multiple") {
                y = 2 * x + 1 + Math.random() * 5;
            } else if (type === "polynomial") {
                y = x * x - 5 * x + 6;
            }
            labels.push(x);
            data.push(y);
        }
        return { labels, data };
    }

    function updateChart() {
        const regressionType = document.getElementById("regressionType").value;
        const { labels, data } = generateData(regressionType);

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: regressionType + " Regression",
                    data: data,
                    borderColor: "blue",
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    function checkAnswer(answer) {
        const feedback = document.getElementById("feedback");
        if (answer === "polynomial") {
            feedback.textContent = "Correct! Polynomial regression is used for non-linear trends.";
            feedback.style.color = "green";
        } else {
            feedback.textContent = "Incorrect. Try again!";
            feedback.style.color = "red";
        }
    }

    window.updateChart = updateChart;
    window.checkAnswer = checkAnswer;
    updateChart();
});