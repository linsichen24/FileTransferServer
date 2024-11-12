const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const os = require('os');

const app = express();
const port = 8080;

app.use(fileUpload());
app.use(express.json());

app.post('/receive-video', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        console.error("No files were uploaded.");
        return res.status(400).json({ error: "No files were uploaded." });
    }

    let videoFile = req.files.video;
    console.log("Received video file:", videoFile.name);

    // 添加时间戳到原始文件名中
    const timestamp = Date.now();
    const originalName = videoFile.name.split('.').slice(0, -1).join('.');
    const extension = videoFile.name.split('.').pop();
    const savePath = path.join(os.homedir(), 'Downloads', `${originalName}-${timestamp}.${extension}`);

    // 保存文件到指定路径
    videoFile.mv(savePath, function(err) {
        if (err) {
            console.error("Error saving file:", err);
            return res.status(500).json({ error: "Failed to save file", details: err });
        }

        console.log("File saved successfully at:", savePath);

        // 生成一个随机数字用于判断起搏
        const ejectionFraction = Math.floor(Math.random() * 100) + 1;
        const pacingRequired = ejectionFraction > 50;
        
        // 生成三个随机坐标点
        const coordinates = Array.from({ length: 3 }, () => {
            return {
                x: (Math.random() * 100).toFixed(2), // x坐标，保留两位小数
                y: (Math.random() * 100).toFixed(2)  // y坐标，保留两位小数
            };
        });

        // 返回起搏判断和三个坐标点
        res.json({ 
            ejectionFraction: ejectionFraction,   // 射血分数的值
            pacingRequired: pacingRequired,       // 布尔值，是否需起搏
            coordinates: coordinates              // 三个坐标点
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
