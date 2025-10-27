
<?php
$current_page = basename($_SERVER['PHP_SELF']);
?>
<header class="bg-white shadow-sm sticky top-0 z-50 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
            <div class="flex items-center gap-2">
                <i data-lucide="heart" class="text-red-500 fill-red-500 w-7 h-7"></i>
                <span class="text-xl font-bold">IMG</span>
            </div>
            
            <nav class="hidden md:flex items-center gap-6">
                <a href="index.php" class="text-gray-700 hover:text-gray-900 transition">All</a>
                <a href="#optimize" class="text-gray-700 hover:text-gray-900 transition">Optimize</a>
                <a href="#create" class="text-gray-700 hover:text-gray-900 transition">Create</a>
                <a href="#edit" class="text-gray-700 hover:text-gray-900 transition">Edit</a>
                <a href="#convert" class="text-gray-700 hover:text-gray-900 transition">Convert</a>
                <a href="#security" class="text-gray-700 hover:text-gray-900 transition">Security</a>
            </nav>

            <button class="md:hidden text-2xl mobile-menu-button">
                <i data-lucide="menu" class="w-7 h-7"></i>
            </button>
        </div>
    </div>

    <!-- Mobile Menu -->
    <div class="md:hidden bg-white border-t hidden mobile-menu">
        <nav class="flex flex-col px-4 py-2">
            <a href="index.php" class="py-3 text-gray-700 hover:text-gray-900 border-b">All</a>
            <a href="#optimize" class="py-3 text-gray-700 hover:text-gray-900 border-b">Optimize</a>
            <a href="#create" class="py-3 text-gray-700 hover:text-gray-900 border-b">Create</a>
            <a href="#edit" class="py-3 text-gray-700 hover:text-gray-900 border-b">Edit</a>
            <a href="#convert" class="py-3 text-gray-700 hover:text-gray-900 border-b">Convert</a>
            <a href="#security" class="py-3 text-gray-700 hover:text-gray-900">Security</a>
        </nav>
    </div>
</header>
