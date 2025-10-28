// Resize Tool Functionality
let originalFile = null;
let resizedBlob = null;
let originalImageData = null;
let aspectRatioLocked = true;
let currentMethod = 'dimensions';

const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const controls = document.getElementById('controls');
const resizeBtn = document.getElementById('resizeBtn');
const previewArea = document.getElementById('previewArea');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

// Event Listeners
uploadArea.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFileSelect);

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        handleFile(file);
    }
});

// Method Tabs
document.querySelectorAll('.method-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
        const method = tab.dataset.method;
        
        // Update tabs
        document.querySelectorAll('.method-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update method content
        document.querySelectorAll('.method-content').forEach(content => content.classList.remove('active'));
        document.getElementById(method + 'Method').classList.add('active');
        
        currentMethod = method;
        
        // Update dimensions based on new method
        if (originalImageData) {
            updateDimensionsForMethod(method);
        }
    });
});

// Dimension Controls
document.getElementById('width').addEventListener('input', handleDimensionChange);
document.getElementById('height').addEventListener('input', handleDimensionChange);

// Dimension Actions
document.querySelectorAll('.dimension-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const action = btn.dataset.action;
        
        if (action === 'lock') {
            aspectRatioLocked = !aspectRatioLocked;
            btn.classList.toggle('active');
            btn.innerHTML = aspectRatioLocked ? '<i class="fas fa-lock"></i>' : '<i class="fas fa-lock-open"></i>';
            document.getElementById('maintainAspect').checked = aspectRatioLocked;
        } else if (action === 'swap') {
            swapDimensions();
        }
    });
});

// Aspect Ratio Toggle
document.getElementById('maintainAspect').addEventListener('change', (e) => {
    aspectRatioLocked = e.target.checked;
    const lockBtn = document.querySelector('[data-action="lock"]');
    lockBtn.classList.toggle('active', aspectRatioLocked);
    lockBtn.innerHTML = aspectRatioLocked ? '<i class="fas fa-lock"></i>' : '<i class="fas fa-lock-open"></i>';
});

// Percentage Controls
document.getElementById('scalePercentage').addEventListener('input', handlePercentageChange);

// Percentage Presets
document.querySelectorAll('.percentage-preset').forEach(preset => {
    preset.addEventListener('click', (e) => {
        document.querySelectorAll('.percentage-preset').forEach(p => p.classList.remove('active'));
        preset.classList.add('active');
        
        const percentage = parseInt(preset.dataset.percentage);
        document.getElementById('scalePercentage').value = percentage;
        
        handlePercentageChange();
    });
});

// Preset Category
document.getElementById('presetCategory').addEventListener('change', (e) => {
    const category = e.target.value;
    
    document.querySelectorAll('.preset-category').forEach(cat => cat.classList.remove('active'));
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
});

// Preset Options
document.querySelectorAll('.preset-option').forEach(option => {
    option.addEventListener('click', (e) => {
        document.querySelectorAll('.preset-option').forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        const width = parseInt(option.dataset.width);
        const height = parseInt(option.dataset.height);
        
        document.getElementById('width').value = width;
        document.getElementById('height').value = height;
        
        updatePreviewDimensions(width, height);
    });
});

// Quality Slider
document.getElementById('quality').addEventListener('input', (e) => {
    e.target.nextElementSibling.textContent = e.target.value + '%';
});

// Format Options
document.querySelectorAll('.format-option').forEach(option => {
    option.addEventListener('click', (e) => {
        document.querySelectorAll('.format-option').forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
    });
});

// Main Actions
resizeBtn.addEventListener('click', resizeImage);
document.getElementById('downloadBtn').addEventListener('click', downloadImage);
resetBtn.addEventListener('click', resetTool);

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) handleFile(file);
}

function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        showStatus('Please select a valid image file', 'error');
        return;
    }

    if (file.size > 10 * 1024 * 1024) {
        showStatus('File size must be less than 10MB', 'error');
        return;
    }

    originalFile = file;
    controls.style.display = 'block';
    previewArea.style.display = 'none';

    const reader = new FileReader();
    reader.onload = (e) => {
        const dataUrl = e.target.result;
        document.getElementById('originalPreview').src = dataUrl;
        
        const img = new Image();
        img.onload = () => {
            originalImageData = {
                img: img,
                width: img.naturalWidth,
                height: img.naturalHeight,
                dataUrl: dataUrl
            };
            
            // Update UI with original image info
            updateImageInfo();
            
            // Set initial dimensions
            document.getElementById('width').value = img.naturalWidth;
            document.getElementById('height').value = img.naturalHeight;
            updatePreviewDimensions(img.naturalWidth, img.naturalHeight);
        };
        img.src = dataUrl;
    };
    reader.readAsDataURL(file);

    showStatus('Image loaded! Set your resize preferences and click Resize Image.', 'success');
}

function handleDimensionChange() {
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');
    
    let width = parseInt(widthInput.value) || 0;
    let height = parseInt(heightInput.value) || 0;
    
    if (aspectRatioLocked && originalImageData && (width > 0 || height > 0)) {
        const originalWidth = originalImageData.width;
        const originalHeight = originalImageData.height;
        const aspectRatio = originalWidth / originalHeight;
        
        if (width > 0 && document.activeElement === widthInput) {
            height = Math.round(width / aspectRatio);
            heightInput.value = height;
        } else if (height > 0 && document.activeElement === heightInput) {
            width = Math.round(height * aspectRatio);
            widthInput.value = width;
        }
    }
    
    updatePreviewDimensions(width, height);
}

function handlePercentageChange() {
    if (!originalImageData) return;
    
    const percentage = parseInt(document.getElementById('scalePercentage').value) || 100;
    const scale = percentage / 100;
    
    const newWidth = Math.round(originalImageData.width * scale);
    const newHeight = Math.round(originalImageData.height * scale);
    
    document.getElementById('width').value = newWidth;
    document.getElementById('height').value = newHeight;
    
    updatePreviewDimensions(newWidth, newHeight);
}

function swapDimensions() {
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');
    
    const temp = widthInput.value;
    widthInput.value = heightInput.value;
    heightInput.value = temp;
    
    handleDimensionChange();
}

function updateDimensionsForMethod(method) {
    if (!originalImageData) return;
    
    switch(method) {
        case 'dimensions':
            // Keep current dimensions
            break;
        case 'percentage':
            handlePercentageChange();
            break;
        case 'preset':
            // First preset will be selected by default
            const firstPreset = document.querySelector('.preset-option');
            if (firstPreset) {
                firstPreset.click();
            }
            break;
    }
}

function updatePreviewDimensions(width, height) {
    document.getElementById('originalDimensions').textContent = 
        `${originalImageData.width} × ${originalImageData.height}`;
    document.getElementById('resizedDimensions').textContent = 
        `${width} × ${height}`;
}

function updateImageInfo() {
    if (!originalImageData || !originalFile) return;
    
    document.getElementById('originalSize').textContent = formatFileSize(originalFile.size);
    document.getElementById('originalDimensionsText').textContent = 
        `${originalImageData.width} × ${originalImageData.height}`;
    document.getElementById('originalFormat').textContent = originalFile.type.split('/')[1].toUpperCase();
    
    document.getElementById('originalSizeText').textContent = 
        `${originalImageData.width}×${originalImageData.height}`;
}

async function resizeImage() {
    if (!originalFile || !originalImageData) {
        showStatus('Please upload an image first', 'error');
        return;
    }

    const width = parseInt(document.getElementById('width').value) || originalImageData.width;
    const height = parseInt(document.getElementById('height').value) || originalImageData.height;
    
    if (width < 1 || width > 10000 || height < 1 || height > 10000) {
        showStatus('Please enter valid dimensions between 1 and 10000 pixels', 'error');
        return;
    }

    showStatus('Resizing image...', 'processing');
    resizeBtn.disabled = true;

    try {
        const result = await performResize(width, height);
        
        if (!result) {
            throw new Error('Resize failed');
        }

        resizedBlob = result.blob;

        const resizedUrl = URL.createObjectURL(resizedBlob);
        document.getElementById('resizedPreview').src = resizedUrl;

        // Update resized image info
        document.getElementById('resizedSize').textContent = formatFileSize(resizedBlob.size);
        document.getElementById('resizedDimensionsText').textContent = `${width} × ${height}`;
        
        const outputFormat = document.querySelector('.format-option.active').dataset.format;
        document.getElementById('resizedFormat').textContent = 
            outputFormat === 'original' ? originalFile.type.split('/')[1].toUpperCase() : outputFormat.toUpperCase();

        // Update comparison text
        document.getElementById('resizedSizeText').textContent = `${width}×${height}`;

        // Calculate and display statistics
        const sizeChange = calculateSizeChange();
        document.getElementById('sizeChange').textContent = sizeChange;

        const qualityScore = calculateQualityScore();
        document.getElementById('qualityScore').textContent = qualityScore;

        const scaleFactor = calculateScaleFactor(width, height);
        document.getElementById('scaleFactor').textContent = scaleFactor;

        const fileReduction = calculateFileReduction();
        document.getElementById('fileReduction').textContent = fileReduction;

        previewArea.style.display = 'block';
        
        showStatus(`✓ Success! Image resized to ${width} × ${height}`, 'success');

    } catch (error) {
        console.error('Resize error:', error);
        showStatus('Error: ' + error.message, 'error');
    } finally {
        resizeBtn.disabled = false;
    }
}

function performResize(width, height) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = width;
        canvas.height = height;
        
        // Apply high-quality resampling
        ctx.imageSmoothingEnabled = document.getElementById('highQuality').checked;
        ctx.imageSmoothingQuality = 'high';
        
        // Draw original image scaled to new dimensions
        ctx.drawImage(originalImageData.img, 0, 0, width, height);
        
        // Get output format and quality
        const outputFormat = document.querySelector('.format-option.active').dataset.format;
        const mimeType = outputFormat === 'original' ? originalFile.type :
                        outputFormat === 'jpeg' ? 'image/jpeg' :
                        outputFormat === 'png' ? 'image/png' : 'image/webp';
        
        const quality = document.getElementById('quality').value / 100;
        
        canvas.toBlob((blob) => {
            resolve(blob ? { blob, width, height } : null);
        }, mimeType, quality);
    });
}

function calculateSizeChange() {
    if (!originalImageData) return '-';
    
    const originalArea = originalImageData.width * originalImageData.height;
    const width = parseInt(document.getElementById('width').value) || originalImageData.width;
    const height = parseInt(document.getElementById('height').value) || originalImageData.height;
    const newArea = width * height;
    
    const change = ((newArea - originalArea) / originalArea * 100);
    
    if (Math.abs(change) < 1) return 'No change';
    
    return (change > 0 ? '+' : '') + change.toFixed(1) + '%';
}

function calculateQualityScore() {
    const quality = document.getElementById('quality').value;
    const highQuality = document.getElementById('highQuality').checked;
    
    let score = parseInt(quality);
    
    // Bonus for high quality resampling
    if (highQuality) score += 5;
    
    // Penalty for large upscaling
    const width = parseInt(document.getElementById('width').value) || originalImageData.width;
    const scale = width / originalImageData.width;
    if (scale > 2) score -= 10;
    if (scale > 3) score -= 15;
    
    return Math.max(0, Math.min(100, score)) + '/100';
}

function calculateScaleFactor(width, height) {
    if (!originalImageData) return '-';
    
    const scaleX = (width / originalImageData.width).toFixed(2) + 'x';
    const scaleY = (height / originalImageData.height).toFixed(2) + 'x';
    
    return `${scaleX} × ${scaleY}`;
}

function calculateFileReduction() {
    if (!resizedBlob || !originalFile) return '-';
    
    const reduction = ((1 - resizedBlob.size / originalFile.size) * 100).toFixed(1);
    return reduction + '%';
}

function downloadImage() {
    if (!resizedBlob) return;

    const url = URL.createObjectURL(resizedBlob);
    const a = document.createElement('a');
    const outputFormat = document.querySelector('.format-option.active').dataset.format;
    const ext = outputFormat === 'original' ? originalFile.name.split('.').pop() : outputFormat;
    a.href = url;
    a.download = `resized_${document.getElementById('width').value}x${document.getElementById('height').value}_${Date.now()}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function resetTool() {
    originalFile = null;
    resizedBlob = null;
    originalImageData = null;
    fileInput.value = '';
    controls.style.display = 'none';
    previewArea.style.display = 'none';
    status.style.display = 'none';
    
    // Reset all inputs to default
    document.getElementById('width').value = '';
    document.getElementById('height').value = '';
    document.getElementById('scalePercentage').value = '100';
    document.getElementById('quality').value = '90';
    document.getElementById('highQuality').checked = true;
    document.getElementById('maintainAspect').checked = true;
    
    // Reset method tabs
    document.querySelectorAll('.method-tab').forEach((tab, index) => {
        tab.classList.remove('active');
        if (index === 0) tab.classList.add('active');
    });
    
    document.querySelectorAll('.method-content').forEach((content, index) => {
        content.classList.remove('active');
        if (index === 0) content.classList.add('active');
    });
    
    document.querySelectorAll('.percentage-preset').forEach((preset, index) => {
        preset.classList.remove('active');
        if (index === 2) preset.classList.add('active'); // 100%
    });
    
    document.querySelectorAll('.format-option').forEach((option, index) => {
        option.classList.remove('active');
        if (index === 0) option.classList.add('active');
    });
    
    document.querySelectorAll('.preset-option').forEach((option, index) => {
        option.classList.remove('active');
        if (index === 0) option.classList.add('active');
    });
    
    aspectRatioLocked = true;
    const lockBtn = document.querySelector('[data-action="lock"]');
    lockBtn.classList.add('active');
    lockBtn.innerHTML = '<i class="fas fa-lock"></i>';
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function showStatus(message, type) {
    status.textContent = message;
    status.className = 'status ' + type;
    status.style.display = 'block';
}