// Importing
import { TOOL_LINE, TOOL_RECTANGLE, TOOL_CIRCLE, TOOL_TRIANGLE, TOOL_PAINT_BUCKET, TOOL_PENCIL, TOOL_BRUSH, TOOL_ERASER } from './tool.js';
import Paint from './paint.class.js';

var paint = new Paint("canvas");
paint.activeTool = TOOL_LINE;
paint.lineWidth = 1;
paint.brushSize = 4;
paint.selectedColor = "#000000";
paint.init();

// Selection (visible) for data-commands
document.querySelectorAll("[data-command]").forEach(
    item => {
        item.addEventListener('click', e => {
            let command = item.getAttribute("data-command");

            if (command == 'undo') {
                paint.undoPaint();
            }else if(command == 'download'){
                var canvas = document.getElementById("canvas");
                var image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
                var link = document.createElement('a');
                link.download = "my-image.png";
                link.href = image;
                link.click();
            }
        });
    }
);

// Selection (visible) for data-tools
document.querySelectorAll("[data-tool]").forEach(
    item => {
        item.addEventListener('click', e => {
            document.querySelector("[data-tool].active").classList.remove("active");
            item.classList.add("active");

            let selectedTool = item.getAttribute("data-tool");
            paint.activeTool = selectedTool;

            // Switching of stroke options according to the selected tool
            switch (selectedTool) {
                case TOOL_LINE:
                case TOOL_RECTANGLE:
                case TOOL_CIRCLE:
                case TOOL_TRIANGLE:
                case TOOL_PENCIL:
                    // Activate shape line width's group
                    document.querySelector(".group.for-shapes").style.display = "block";
                    // Invisible brush line width's group
                    document.querySelector(".group.for-brush").style.display = "none";
                    break;

                case TOOL_BRUSH:
                case TOOL_ERASER:
                    // Activate brush line width's group
                    document.querySelector(".group.for-brush").style.display = "block";
                    // Invisible shape line width's group
                    document.querySelector(".group.for-shapes").style.display = "none";
                    break;

                default:
                    // Make invisible both line width's group
                    document.querySelector(".group.for-brush").style.display = "none";
                    document.querySelector(".group.for-shapes").style.display = "none";
            }
        });
    }
);

// Selection (visible) for data-line-widths
document.querySelectorAll("[data-line-width]").forEach(
    item => {
        item.addEventListener('click', e => {
            document.querySelector("[data-line-width].active").classList.remove("active");
            item.classList.add("active");

            let linewidth = item.getAttribute("data-line-width");
            paint.lineWidth = linewidth;
        });
    }
);

// Selection (visible) for data-brush-widths
document.querySelectorAll("[data-brush-width]").forEach(
    item => {
        item.addEventListener('click', e => {
            document.querySelector("[data-brush-width].active").classList.remove("active");
            item.classList.add("active");

            let brushsize = item.getAttribute("data-brush-width");
            paint.brushSize = brushsize;
        });
    }
);

// Selection (visible) for data-colors
document.querySelectorAll("[data-color]").forEach(
    item => {
        item.addEventListener('click', e => {
            document.querySelector("[data-color].active").classList.remove("active");
            item.classList.add("active");

            let color = item.getAttribute("data-color");
            paint.selectedColor = color;
        });
    }
);

