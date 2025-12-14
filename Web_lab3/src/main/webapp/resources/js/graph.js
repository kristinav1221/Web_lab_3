function drawGraph() {
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    let r = currentR;
    if (isNaN(r) || r < 1 || r > 5) r = 2.0;

    const centerX = width / 2;
    const centerY = height / 2;
    const scale = (width / 2.5) / 5;

    ctx.fillStyle = '#3498db';

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + (r/2)*scale, centerY);
    ctx.lineTo(centerX, centerY + r*scale);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, r*scale, -Math.PI, -Math.PI/2);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.rect(centerX - r*scale, centerY, r*scale, (r/2)*scale);
    ctx.fill();

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;

    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';

    ctx.fillText('R/2', centerX + (r/2)*scale - 10, centerY + 15);
    ctx.fillText('R', centerX + r*scale - 10, centerY + 15);
    ctx.fillText('-R/2', centerX - (r/2)*scale - 25, centerY + 15);
    ctx.fillText('-R', centerX - r*scale - 20, centerY + 15);
    ctx.fillText('R', centerX + 5, centerY - r*scale + 5);
    ctx.fillText('R/2', centerX + 5, centerY - (r/2)*scale + 5);
    ctx.fillText('-R/2', centerX + 5, centerY + (r/2)*scale + 5);
    ctx.fillText('-R', centerX + 5, centerY + r*scale + 5);

    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    if (typeof points !== 'undefined' && points.length > 0) {
        points.forEach(point => {
            const canvasX = centerX + point.x * scale;
            const canvasY = centerY - point.y * scale;

            ctx.fillStyle = point.result ? '#2ecc71' : '#e74c3c';
            ctx.beginPath();
            ctx.arc(canvasX, canvasY, 3, 0, 2*Math.PI);
            ctx.fill();
        });
    }
}

function handleCanvasClick(event) {
    const canvas = document.getElementById('graphCanvas');
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = (canvas.width / 2.5) / 5;

    const x = (clickX - centerX) / scale;
    const y = (centerY - clickY) / scale;

    document.getElementById('graphForm:graphX').value = x.toFixed(4);
    document.getElementById('graphForm:graphY').value = y.toFixed(4);

    document.getElementById('graphForm:graphSubmit').click();
}

window.addEventListener('load', function() {
    drawGraph();
    document.getElementById('graphCanvas').addEventListener('click', handleCanvasClick);
});
