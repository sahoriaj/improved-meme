<?php
require_once 'config.php';
require_once 'tools-data.php';
require_once 'features-data.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>iLoveIMG Clone - Online Image Editor</title>
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="styles.css">
</head>
<body class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 opacity-30">
        <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div class="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div class="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
    </div>

    <?php include 'header.php'; ?>

    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center relative">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 animate-slideDown">
            Every tool you could want to edit images in bulk
        </h1>
        <p class="text-gray-600 text-lg mb-8 animate-slideDown" style="animation-delay: 0.1s">
            Your online photo editor is here and forever free!
        </p>
    </section>

    <!-- Tools Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative">
        <?php foreach ($tools as $categoryIndex => $category): ?>
            <div class="mb-12">
                <h3 class="text-sm font-semibold text-gray-500 mb-4 tracking-wide">
                    <?php echo htmlspecialchars($category['category']); ?>
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <?php foreach ($category['items'] as $toolIndex => $tool): ?>
                        <a
                            href="<?php echo $tool['href']; ?>"
                            class="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                            style="animation: slideUp 0.5s ease-out <?php echo ($categoryIndex * 0.1) + ($toolIndex * 0.05); ?>s both"
                        >
                            <div class="<?php echo $tool['color']; ?> w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                <i data-lucide="<?php echo $tool['icon']; ?>"></i>
                            </div>
                            
                            <?php if (!empty($tool['badge'])): ?>
                                <span class="absolute top-4 right-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                    <?php echo htmlspecialchars($tool['badge']); ?>
                                </span>
                            <?php endif; ?>
                            
                            <h4 class="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                                <?php echo htmlspecialchars($tool['title']); ?>
                            </h4>
                            <p class="text-sm text-gray-600 leading-relaxed">
                                <?php echo htmlspecialchars($tool['desc']); ?>
                            </p>
                        </a>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endforeach; ?>
    </section>

    <!-- Work Your Way Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            Work your way
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <?php foreach ($features as $index => $feature): ?>
                <a
                    href="<?php echo $feature['href']; ?>"
                    class="group bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    style="animation: scaleIn 0.6s ease-out <?php echo $index * 0.2; ?>s both"
                >
                    <div class="w-16 h-16 mb-6 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center <?php echo $feature['image_color']; ?>">
                        <i data-lucide="<?php echo $feature['image_icon']; ?>"></i>
                    </div>
                    <h3 class="font-semibold text-xl text-gray-900 mb-3">
                        <?php echo htmlspecialchars($feature['title']); ?>
                    </h3>
                    <p class="text-gray-600 mb-4 leading-relaxed">
                        <?php echo htmlspecialchars($feature['desc']); ?>
                    </p>
                    <i data-lucide="arrow-right" class="text-blue-600 group-hover:translate-x-2 transition-transform"></i>
                </a>
            <?php endforeach; ?>
        </div>
    </section>

    <!-- Premium Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div class="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-8 sm:p-12 text-center shadow-lg">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Get more with Premium
            </h2>
            <p class="text-gray-700 mb-8 max-w-2xl mx-auto">
                Work faster and smarter with advanced editing tools, batch processing, and powerful AI features—built for high-demand workflows.
            </p>
            <a href="#" class="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2">
                <i data-lucide="zap" class="w-5 h-5"></i>
                Get Premium
            </a>
        </div>
    </section>

    <!-- Trust Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Your trusted online image editor, loved by users worldwide
        </h2>
        <p class="text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            iLoveIMG is your simple solution for editing images online. Access all the tools you need to enhance your images easily, straight from the web, with 100% security.
        </p>
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div class="flex flex-col items-center">
                <i data-lucide="zap" class="mb-3 text-gray-700 w-10 h-10"></i>
                <p class="font-semibold text-gray-900">ZERO WAIT</p>
            </div>
            <div class="flex flex-col items-center">
                <i data-lucide="shield" class="mb-3 text-gray-700 w-10 h-10"></i>
                <p class="font-semibold text-gray-900">100% SECURE</p>
            </div>
            <div class="flex flex-col items-center">
                <i data-lucide="globe" class="mb-3 text-gray-700 w-10 h-10"></i>
                <p class="font-semibold text-gray-900">GDPR</p>
            </div>
        </div>
    </section>

    <?php include 'footer.php'; ?>

    <script src="functions.js"></script>
</body>
</html>
