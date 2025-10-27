import React, { useState, useEffect } from 'react';
import { 
  Compass, Image, Crop, RotateCw, 
  Scissors, Droplet, FileText, Lock,
  Menu, X, ArrowRight, Zap, Heart,
  Maximize2, Eye, Shield, Globe,
  Smartphone, Cpu, File
} from 'lucide-react';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const tools = [
    {
      category: 'OPTIMIZE',
      items: [
        {
          icon: <Compass />,
          title: 'Compress IMAGE',
          desc: 'Reduce file size with no visible quality loss',
          color: 'bg-green-100 text-green-600',
          href: '#'
        },
        {
          icon: <Maximize2 />,
          title: 'Upscale Image',
          desc: 'Improve resolution, sharpen and denoise',
          color: 'bg-emerald-100 text-emerald-600',
          badge: 'NEW',
          href: '#'
        },
        {
          icon: <Scissors />,
          title: 'Remove background',
          desc: 'Remove backgrounds with high accuracy',
          color: 'bg-green-100 text-green-600',
          badge: 'NEW',
          href: '#'
        }
      ]
    },
    {
      category: 'CREATE',
      items: [
        {
          icon: <Image />,
          title: 'Meme generator',
          desc: 'Create fun memes online with text and images',
          color: 'bg-purple-100 text-purple-600',
          href: '#'
        },
        {
          icon: <Image />,
          title: 'Photo editor',
          desc: 'Edit your pictures with filters, shapes and text',
          color: 'bg-pink-100 text-pink-600',
          href: '#'
        }
      ]
    },
    {
      category: 'MODIFY',
      items: [
        {
          icon: <Maximize2 />,
          title: 'Resize IMAGE',
          desc: 'Define pixels or use a percentage',
          color: 'bg-blue-100 text-blue-600',
          href: '#'
        },
        {
          icon: <Crop />,
          title: 'Crop IMAGE',
          desc: 'Cut images to focus on what matters',
          color: 'bg-cyan-100 text-cyan-600',
          href: '#'
        },
        {
          icon: <RotateCw />,
          title: 'Rotate IMAGE',
          desc: 'Rotate left or right any JPG, PNG or GIF',
          color: 'bg-blue-100 text-blue-600',
          href: '#'
        }
      ]
    },
    {
      category: 'CONVERT',
      items: [
        {
          icon: <Image />,
          title: 'Convert to JPG',
          desc: 'Convert JPG, PNG, GIF, or RAW to JPG',
          color: 'bg-yellow-100 text-yellow-600',
          href: '#'
        },
        {
          icon: <Image />,
          title: 'Convert from JPG',
          desc: 'Transform JPG images to various formats',
          color: 'bg-amber-100 text-amber-600',
          href: '#'
        },
        {
          icon: <FileText />,
          title: 'HTML to IMAGE',
          desc: 'Convert HTML code to image',
          color: 'bg-yellow-100 text-yellow-600',
          href: '#'
        }
      ]
    },
    {
      category: 'SECURITY',
      items: [
        {
          icon: <Droplet />,
          title: 'Watermark IMAGE',
          desc: 'Add watermark to protect your images',
          color: 'bg-indigo-100 text-indigo-600',
          href: '#'
        },
        {
          icon: <Eye />,
          title: 'Blur face',
          desc: 'Blur faces and hide identities',
          color: 'bg-blue-100 text-blue-600',
          badge: 'NEW',
          href: '#'
        }
      ]
    }
  ];

  const features = [
    {
      icon: <File />,
      title: 'Switch to document mode',
      desc: 'Use iLovePDF to simplify your work with PDF',
      image: <File className="text-blue-600" size={48} />,
      href: '#'
    },
    {
      icon: <Smartphone />,
      title: 'Scan and edit on the go',
      desc: 'Scan paper documents with your mobile',
      image: <Smartphone className="text-green-600" size={48} />,
      href: '#'
    },
    {
      icon: <Cpu />,
      title: 'Scale with the iLoveIMG API',
      desc: 'Automate image work with powerful editing tools',
      image: <Cpu className="text-purple-600" size={48} />,
      href: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Heart className="text-red-500 fill-red-500" size={28} />
              <span className="text-xl font-bold">IMG</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-700 hover:text-gray-900 transition">All</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition">Optimize</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition">Create</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition">Edit</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition">Convert</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition">Security</a>
            </nav>

            <button 
              className="md:hidden text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t animate-fadeIn">
            <nav className="flex flex-col px-4 py-2">
              <a href="#" className="py-3 text-gray-700 hover:text-gray-900 border-b">All</a>
              <a href="#" className="py-3 text-gray-700 hover:text-gray-900 border-b">Optimize</a>
              <a href="#" className="py-3 text-gray-700 hover:text-gray-900 border-b">Create</a>
              <a href="#" className="py-3 text-gray-700 hover:text-gray-900 border-b">Edit</a>
              <a href="#" className="py-3 text-gray-700 hover:text-gray-900 border-b">Convert</a>
              <a href="#" className="py-3 text-gray-700 hover:text-gray-900">Security</a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center relative">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 animate-slideDown">
          Every tool you could want to edit images in bulk
        </h1>
        <p className="text-gray-600 text-lg mb-8 animate-slideDown" style={{animationDelay: '0.1s'}}>
          Your online photo editor is here and forever free!
        </p>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative">
        {tools.map((category, idx) => (
          <div key={idx} className="mb-12">
            <h3 className="text-sm font-semibold text-gray-500 mb-4 tracking-wide">
              {category.category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {category.items.map((tool, toolIdx) => (
                <a
                  href={tool.href}
                  key={toolIdx}
                  className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                  style={{
                    animation: `slideUp 0.5s ease-out ${(idx * 0.1) + (toolIdx * 0.05)}s both`
                  }}
                >
                  <div className={`${tool.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {tool.icon}
                  </div>
                  
                  {tool.badge && (
                    <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      {tool.badge}
                    </span>
                  )}
                  
                  <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                    {tool.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {tool.desc}
                  </p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Work Your Way Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
          Work your way
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <a
              href={feature.href}
              key={idx}
              className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{
                animation: `scaleIn 0.6s ease-out ${idx * 0.2}s both`
              }}
            >
              <div className="w-16 h-16 mb-6 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                {feature.image}
              </div>
              <h3 className="font-semibold text-xl text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {feature.desc}
              </p>
              <ArrowRight className="text-blue-600 group-hover:translate-x-2 transition-transform" />
            </a>
          ))}
        </div>
      </section>

      {/* Premium Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-8 sm:p-12 text-center shadow-lg">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Get more with Premium
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Work faster and smarter with advanced editing tools, batch processing, and powerful AI features—built for high-demand workflows.
          </p>
          <a href="#" className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2">
            <Zap size={20} />
            Get Premium
          </a>
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Your trusted online image editor, loved by users worldwide
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
          iLoveIMG is your simple solution for editing images online. Access all the tools you need to enhance your images easily, straight from the web, with 100% security.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            <Zap className="mb-3 text-gray-700" size={40} />
            <p className="font-semibold text-gray-900">ZERO WAIT</p>
          </div>
          <div className="flex flex-col items-center">
            <Shield className="mb-3 text-gray-700" size={40} />
            <p className="font-semibold text-gray-900">100% SECURE</p>
          </div>
          <div className="flex flex-col items-center">
            <Globe className="mb-3 text-gray-700" size={40} />
            <p className="font-semibold text-gray-900">GDPR</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">PRODUCT</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Home</a></li>
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Tools</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">RESOURCES</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">iLoveIMG</a></li>
                <li><a href="#" className="hover:text-white transition">iLovePDF</a></li>
                <li><a href="#" className="hover:text-white transition">iLovePPT</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">LEGAL</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms & conditions</a></li>
                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">COMPANY</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">About us</a></li>
                <li><a href="#" className="hover:text-white transition">Contact us</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Press</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© iLoveIMG 2025 • Your Image Editor</p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition text-xl">𝕏</a>
              <a href="#" className="text-gray-400 hover:text-white transition text-xl">f</a>
              <a href="#" className="text-gray-400 hover:text-white transition text-xl">in</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default App;
