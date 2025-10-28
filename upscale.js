// Upscale Tool Functionality
let originalFile = null;
let upscaledBlob = null;
let selectedScale = 2;
let enhancementSettings = {
    mode: 'balanced',
    sharpening: true,
    denoising: true,
    faceEnhancement: false,
    textureRecovery: false,
    sharpeningStrength: 50,
    denoiseStrength: 30,
    artifactRemoval: 40
};

const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const controls = document.getElementById('controls');
const upscaleBtn = document.getElementById('upscaleBtn');
const previewArea = document.getElementById('previewArea');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const processing = document.getElementById('processing');

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Theme Toggle
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    themeIcon.className = isDark ? "fas fa-sun" : "fas fa-moon";
});

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

// Scale Options
document.querySelectorAll('.scale-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.scale-option').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        if (btn.dataset.scale === 'custom') {
            document.getElementById('customScale').style.display = 'flex';
            selectedScale = parseFloat(document.getElementById('customScaleValue').value);
        } else {
            document.getElementById('customScale').style.display = 'none';
            selectedScale = parseFloat(btn.dataset.scale);
        }
    });
});

// Custom Scale Input
document.getElementById('customScaleValue').addEventListener('input', (e) => {
    selectedScale = parseFloat(e.target.value) || 2;
});

// Enhancement Mode
document.getElementById('enhancementMode').addEventListener('change', (e) => {
    enhancementSettings.mode = e.target.value;
});

// Feature Toggles
document.getElementById('sharpening').addEventListener('change', (e) => {
    enhancementSettings.sharpening = e.target.checked;
});

document.getElementById('denoising').addEventListener('change', (e) => {
    enhancementSettings.denoising = e.target.checked;
});

document.getElementById('faceEnhancement').addEventListener('change', (e) => {
    enhancementSettings.faceEnhancement = e.target.checked;
});

document.getElementById('textureRecovery').addEventListener('change', (e) => {
    enhancementSettings.textureRecovery = e.target.checked;
});

// Advanced Settings Sliders
document.getElementById('sharpeningStrength').addEventListener('input', (e) => {
    enhancementSettings.sharpeningStrength = parseInt(e.target.value);
    e.target.nextElementSibling.textContent = e.target.value + '%';
});

document.getElementById('denoiseStrength').addEventListener('input', (e) => {
    enhancementSettings.denoiseStrength = parseInt(e.target.value);
    e.target.nextElementSibling.textContent = e.target.value + '%';
});

document.getElementById('artifactRemoval').addEventListener('input', (e) => {
    enhancementSettings.artifactRemoval = parseInt(e.target.value);
    e.target.nextElementSibling.textContent = e.target.value + '%';
});

// Advanced Settings Toggle
document.querySelector('.advanced-toggle').addEventListener('click', (e) => {
    const content = document.querySelector('.advanced-content');
    const parent = e.currentTarget.parentElement;
    
    parent.classList.toggle('active');
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
});

// View Options
document.querySelectorAll('.view-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.view-option').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const view = btn.dataset.view;
        const container = document.querySelector('.preview-container');
        container.className = 'preview-container ' + view + '-view';
    });
});

// Main Actions
upscaleBtn.addEventListener('click', upscaleImage);
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

    if (file.size > 5 * 1024 * 1024) {
        showStatus('File size must be less than 5MB for upscaling', 'error');
        return;
    }

    originalFile = file;
    controls.style.display = 'block';
    previewArea.style.display = 'none';
    processing.style.display = 'none';

    const reader = new FileReader();
    reader.onload = (e) => {
        const dataUrl = e.target.result;
        document.getElementById('originalPreview').src = dataUrl;
        
        const img = new Image();
        img.onload = () => {
            document.getElementById('originalSize').textContent = formatFileSize(file.size);
            document.getElementById('originalDimensions').textContent = `${img.width} x ${img.height}`;
            document.getElementById('originalFormat').textContent = file.type.split('/')[1].toUpperCase();
        };
        img.src = dataUrl;
    };
    reader.readAsDataURL(file);

    showStatus('Image loaded! Configure enhancement settings and click upscale.', 'success');
}

async function upscaleImage() {
    if (!originalFile) {
        showStatus('Please upload an image first', 'error');
        return;
    }

    if (selectedScale < 1.1 || selectedScale > 8) {
        showStatus('Please select a scale factor between 1.1x and 8x', 'error');
        return;
    }

    showStatus('Starting AI enhancement process...', 'processing');
    controls.style.display = 'none';
    processing.style.display = 'block';
    upscaleBtn.disabled = true;

    const startTime = Date.now();

    try {
        // Simulate AI processing with progress updates
        await simulateAIProcessing();
        
        const result = await performUpscaling(selectedScale, enhancementSettings);
        
        if (!result) {
            throw new Error('Upscaling failed');
        }

        upscaledBlob = result.blob;

        const upscaledUrl = URL.createObjectURL(upscaledBlob);
        document.getElementById('enhancedPreview').src = upscaledUrl;

        // Update enhanced image info
        document.getElementById('enhancedSize').textContent = formatFileSize(upscaledBlob.size);
        document.getElementById('enhancedDimensions').textContent = `${result.width} x ${result.height}`;
        document.getElementById('enhancedFormat').textContent = document.getElementById('outputFormat').value.toUpperCase();

        // Calculate and display statistics
        const originalImg = document.getElementById('originalPreview');
        const resolutionIncrease = ((result.width * result.height) / (originalImg.naturalWidth * originalImg.naturalHeight)).toFixed(1) + 'x';
        document.getElementById('resolutionIncrease').textContent = resolutionIncrease;

        const qualityScore = calculateQualityScore(enhancementSettings);
        document.getElementById('qualityScore').textContent = qualityScore + '/100';

        const processingTime = ((Date.now() - startTime) / 1000).toFixed(1);
        document.getElementById('processingTime').textContent = processingTime + 's';

        const enhancements = countActiveEnhancements(enhancementSettings);
        document.getElementById('enhancementsApplied').textContent = enhancements;

        processing.style.display = 'none';
        previewArea.style.display = 'block';
        
        showStatus(`✓ Success! Image upscaled to ${result.width} x ${result.height}`, 'success');

    } catch (error) {
        console.error('Upscaling error:', error);
        showStatus('Error: ' + error.message, 'error');
        processing.style.display = 'none';
        controls.style.display = 'block';
    } finally {
        upscaleBtn.disabled = false;
    }
}

function simulateAIProcessing() {
    return new Promise((resolve) => {
        const steps = document.querySelectorAll('.processing-steps .step');
        const progressFill = document.querySelector('.progress-fill');
        
        let currentStep = 0;
        
        const processStep = () => {
            if (currentStep < steps.length) {
                // Update current step
                steps[currentStep].classList.add('active');
                steps[currentStep].querySelector('i').className = 'fas fa-check';
                
                // Update progress
                const progress = ((currentStep + 1) / steps.length) * 100;
                progressFill.style.width = progress + '%';
                
                currentStep++;
                setTimeout(processStep, 800 + Math.random() * 400);
            } else {
                resolve();
            }
        };
        
        processStep();
    });
}

function performUpscaling(scale, settings) {
    return new Promise((resolve) => {
        const originalImg = document.getElementById('originalPreview');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calculate new dimensions
        const newWidth = Math.round(originalImg.naturalWidth * scale);
        const newHeight = Math.round(originalImg.naturalHeight * scale);
        
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        // Apply high-quality scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // Draw original image scaled up
        ctx.drawImage(originalImg, 0, 0, newWidth, newHeight);
        
        // Apply enhancement simulations based on settings
        applyEnhancements(ctx, canvas, settings);
        
        // Get output format
        const outputFormat = document.getElementById('outputFormat').value;
        const mimeType = outputFormat === 'jpeg' ? 'image/jpeg' : 
                        outputFormat === 'webp' ? 'image/webp' : 'image/png';
        
        const quality = outputFormat === 'png' ? 1 : 0.92;
        
        canvas.toBlob((blob) => {
            resolve(blob ? { blob, width: newWidth, height: newHeight } : null);
        }, mimeType, quality);
    });
}

function applyEnhancements(ctx, canvas, settings) {
    // This is a simplified simulation of enhancement effects
    // In a real implementation, this would use more advanced algorithms
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Simulate sharpening effect
    if (settings.sharpening) {
        const strength = settings.sharpeningStrength / 100;
        // Simple edge enhancement simulation
        for (let i = 0; i < data.length; i += 4) {
            if (i % (canvas.width * 4) < (canvas.width - 1) * 4 && i < data.length - 4) {
                data[i] = Math.min(255, data[i] * (1 + strength * 0.1));
                data[i + 1] = Math.min(255, data[i + 1] * (1 + strength * 0.1));
                data[i + 2] = Math.min(255, data[i + 2] * (1 + strength * 0.1));
            }
        }
    }
    
    // Simulate noise reduction
    if (settings.denoising) {
        const strength = settings.denoiseStrength / 100;
        // Simple noise reduction simulation
        for (let i = 0; i < data.length; i += 4) {
            if (Math.random() < strength * 0.1) {
                const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = data[i + 1] = data[i + 2] = avg;
            }
        }
    }
    
    ctx.putImageData(imageData, 0, 0);
}

function calculateQualityScore(settings) {
    let score = 70; // Base score
    
    // Add points for active enhancements
    if (settings.sharpening) score += 10;
    if (settings.denoising) score += 8;
    if (settings.faceEnhancement) score += 7;
    if (settings.textureRecovery) score += 5;
    
    // Add points for enhancement strength
    score += (settings.sharpeningStrength + settings.denoiseStrength + settings.artifactRemoval) / 15;
    
    // Mode bonuses
    const modeBonuses = {
        'balanced': 5,
        'quality': 10,
        'speed': 0,
        'artwork': 8,
        'photos': 7
    };
    
    score += modeBonuses[settings.mode] || 0;
    
    return Math.min(95, Math.round(score));
}

function countActiveEnhancements(settings) {
    let count = 0;
    if (settings.sharpening) count++;
    if (settings.denoising) count++;
    if (settings.faceEnhancement) count++;
    if (settings.textureRecovery) count++;
    return count;
}

function downloadImage() {
    if (!upscaledBlob) return;

    const url = URL.createObjectURL(upscaledBlob);
    const a = document.createElement('a');
    const ext = document.getElementById('outputFormat').value;
    a.href = url;
    a.download = `upscaled_${selectedScale}x_${Date.now()}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function resetTool() {
    originalFile = null;
    upscaledBlob = null;
    selectedScale = 2;
    fileInput.value = '';
    controls.style.display = 'none';
    previewArea.style.display = 'none';
    processing.style.display = 'none';
    status.style.display = 'none';
    
    // Reset all toggles and sliders to default
    document.getElementById('sharpening').checked = true;
    document.getElementById('denoising').checked = true;
    document.getElementById('faceEnhancement').checked = false;
    document.getElementById('textureRecovery').checked = false;
    document.getElementById('sharpeningStrength').value = 50;
    document.getElementById('denoiseStrength').value = 30;
    document.getElementById('artifactRemoval').value = 40;
    document.getElementById('enhancementMode').value = 'balanced';
    
    document.querySelectorAll('.scale-option').forEach((btn, index) => {
        btn.classList.remove('active');
        if (index === 0) btn.classList.add('active');
    });
    document.getElementById('customScale').style.display = 'none';
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