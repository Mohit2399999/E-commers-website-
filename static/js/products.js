/**
 * NEXUS TECH - Product Catalog Database
 * High-definition gadget catalog for modern e-commerce college showcase
 */

const PRODUCTS_DATA = [
  {
    id: 1,
    name: "Nebula Aurora NC Wireless Headphones",
    tagline: "Titanium Noise-Canceling Audiophile Headset",
    category: "audio",
    categoryLabel: "Audio & Sound",
    price: 349.99,
    originalPrice: 429.99,
    rating: 4.9,
    reviewsCount: 384,
    badge: "BESTSELLER",
    inStock: true,
    stockCount: 14,
    image: "assets/hero_headphones.jpg",
    gallery: [
      "assets/hero_headphones.jpg",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["#1e293b", "#e2e8f0", "#38bdf8"],
    description: "Equipped with aerospace-grade titanium drivers and active dual-core neural noise cancellation, the Aurora NC delivers studio-master acoustics with 60-hour continuous battery life.",
    specs: {
      "Driver": "40mm Beryllium Acoustic Diaphragm",
      "Battery Life": "60 Hours with ANC Active",
      "Connectivity": "Bluetooth 5.4 + Low Latency 2.4GHz",
      "Noise Cancellation": "Hybrid Active ANC up to -48dB",
      "Fast Charging": "10 min charge for 8 hours playback",
      "Warranty": "2 Years Official Manufacturer Coverage"
    }
  },
  {
    id: 2,
    name: "Aether Chronos X1 Titanium Smartwatch",
    tagline: "Sapphire Crystal Ultra-Fitness Companion",
    category: "wearables",
    categoryLabel: "Smart Wearables",
    price: 279.99,
    originalPrice: 349.99,
    rating: 4.8,
    reviewsCount: 219,
    badge: "NEW ARRIVAL",
    inStock: true,
    stockCount: 22,
    image: "assets/hero_smartwatch.jpg",
    gallery: [
      "assets/hero_smartwatch.jpg",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["#0f172a", "#10b981", "#64748b"],
    description: "Crafted from Grade-5 forged titanium with an always-on 1.5-inch micro-OLED display, dual-frequency GPS, biometric ECG monitoring, and 100-meter water resistance.",
    specs: {
      "Display": "1.5\" LTPO Micro-OLED 2000 Nits",
      "Sensors": "Optical Heart Rate, SpO2, ECG, Body Temp",
      "Water Resistance": "10 ATM (100 Meters Diving Grade)",
      "Battery": "14 Days Typical Use / 48h GPS",
      "Casing": "Grade 5 Titanium & Ceramic Back",
      "Warranty": "2 Years International Replacement"
    }
  },
  {
    id: 3,
    name: "Vortex Pro 16 Ultrabook M-Pro",
    tagline: "Liquid Metal Cooled 3.2K OLED Workstation",
    category: "laptops",
    categoryLabel: "Laptops & PCs",
    price: 1899.99,
    originalPrice: 2199.99,
    rating: 5.0,
    reviewsCount: 142,
    badge: "FLAGSHIP",
    inStock: true,
    stockCount: 8,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["#334155", "#94a3b8"],
    description: "Engineered for elite software engineering, 3D rendering, and video creation. Boasts a 120Hz Liquid Retina XDR display, 32GB Unified Memory, and 1TB NVMe PCIe 5.0 storage.",
    specs: {
      "Processor": "14-Core High Performance Silicon Chip",
      "Memory": "32GB High-Speed Unified RAM",
      "Storage": "1TB Gen 5 NVMe SSD (7400 MB/s)",
      "Display": "16.2\" 3.2K Liquid OLED 120Hz ProMotion",
      "Battery": "99.8Whr Battery (Up to 21 Hours)",
      "Ports": "3x Thunderbolt 4, HDMI 2.1, SDXC Slot"
    }
  },
  {
    id: 4,
    name: "CyberBlade Neo 5G Flagship Smartphone",
    tagline: "200MP Periscope Camera & Snapdragon Elite",
    category: "phones",
    categoryLabel: "Smartphones",
    price: 899.99,
    originalPrice: 1049.99,
    rating: 4.8,
    reviewsCount: 512,
    badge: "HOT DEAL",
    inStock: true,
    stockCount: 19,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["#0f172a", "#6366f1", "#ec4899"],
    description: "The peak of smartphone engineering with an aerospace ceramic back, 200MP optical zoom stabilization, AI neural translation engine, and lightning 120W HyperCharge.",
    specs: {
      "Display": "6.8\" AMOLED 2K curved 144Hz HDR10+",
      "Camera": "200MP Primary + 50MP Ultra-wide + 50MP Telephoto",
      "Processor": "Snapdragon 8 Gen 3 (4nm Octa-core)",
      "Charging": "120W Wired + 50W Wireless Fast Charge",
      "Battery": "5,400 mAh High-Density Graphene",
      "Security": "Sonic 3D Ultrasonic Under-Display Fingerprint"
    }
  },
  {
    id: 5,
    name: "Apex Pulse RGB Mechanical Keyboard",
    tagline: "Hall Effect Magnetic Rapid Trigger Switches",
    category: "gaming",
    categoryLabel: "Gaming Gear",
    price: 159.99,
    originalPrice: 199.99,
    rating: 4.9,
    reviewsCount: 420,
    badge: "GAMING PICK",
    inStock: true,
    stockCount: 35,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["#18181b", "#ffffff"],
    description: "Dominate every match with adjustable 0.1mm actuation Hall-Effect magnetic switches, PBT double-shot keycaps, CNC aluminum frame, and sound-dampening silicon gaskets.",
    specs: {
      "Switches": "Magnetic Hall-Effect Rapid Trigger",
      "Actuation": "0.1mm to 4.0mm Per-Key Customizable",
      "Polling Rate": "8,000 Hz Hyper-Polling Speed",
      "Keycaps": "Double-shot PBT Cherry Profile",
      "Backlighting": "Per-Key RGB with 24 Dynamic Modes",
      "Cable": "Detachable Braided Type-C"
    }
  },
  {
    id: 6,
    name: "ShadowStrike Ultra Wireless Gaming Mouse",
    tagline: "49-Gram Magnesium Alloy Featherweight Mouse",
    category: "gaming",
    categoryLabel: "Gaming Gear",
    price: 119.99,
    originalPrice: 149.99,
    rating: 4.7,
    reviewsCount: 310,
    badge: "POPULAR",
    inStock: true,
    stockCount: 28,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["#09090b", "#f43f5e"],
    description: "An ultra-lightweight magnesium alloy skeleton mouse weighing just 49 grams. Features the PixArt 3395 26,000 DPI sensor and optical micro-switches rated for 90 million clicks.",
    specs: {
      "Weight": "49 Grams Featherweight Chassis",
      "Sensor": "PixArt 3395 Optical (26K DPI)",
      "Max Acceleration": "650 IPS / 50G Acceleration",
      "Battery Life": "80 Hours High-Speed 2.4G",
      "Feet": "100% Virgin Grade PTFE Skates",
      "Switches": "Optical Micro Switches (90M Clicks)"
    }
  },
  {
    id: 7,
    name: "SoundSphere 360 Spatial Hi-Fi Speaker",
    tagline: "Acoustic Glass Dome with Synchronized Ambient Light",
    category: "audio",
    categoryLabel: "Audio & Sound",
    price: 229.99,
    originalPrice: 289.99,
    rating: 4.9,
    reviewsCount: 168,
    badge: "DESIGN AWARD",
    inStock: true,
    stockCount: 16,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["#1e293b", "#f8fafc"],
    description: "Omnidirectional 360-degree high-fidelity speaker with integrated passive downward subwoofer, lossless AirPlay 2 / Spotify Connect, and soothing organic ambient lighting.",
    specs: {
      "Output Power": "85W RMS Total System Power",
      "Frequency Response": "35Hz - 22,000Hz",
      "Wireless Protocol": "Wi-Fi 6, AirPlay 2, Bluetooth 5.3",
      "Multi-Room": "Pair up to 8 units in Stereo or Multi-Room",
      "Dimensions": "210mm x 180mm x 180mm",
      "Weight": "2.4 kg"
    }
  },
  {
    id: 8,
    name: "QuantumView 34\" Curved QD-OLED Monitor",
    tagline: "175Hz Ultrawide Gaming & Creator Display",
    category: "gaming",
    categoryLabel: "Gaming Gear",
    price: 799.99,
    originalPrice: 999.99,
    rating: 4.9,
    reviewsCount: 95,
    badge: "PREMIUM",
    inStock: true,
    stockCount: 6,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["#0f172a"],
    description: "Stunning 1800R curved Quantum Dot OLED panel with true 0.03ms response time, infinite contrast, 99.3% DCI-P3 color gamut, and 90W USB-C single cable docking.",
    specs: {
      "Panel Size & Curve": "34\" Ultrawide 21:9 with 1800R Curve",
      "Resolution": "3440 x 1440 WQHD",
      "Refresh Rate": "175Hz Refresh with G-Sync Compatible",
      "Response Time": "0.03ms (GtG) Pure OLED Speed",
      "HDR Certification": "VESA DisplayHDR True Black 400",
      "Ports": "2x DP 1.4, 2x HDMI 2.1, 90W USB-C Power"
    }
  },
  {
    id: 9,
    name: "VoltCharge 140W GaN 4-Port Fast Hub",
    tagline: "Gallium Nitride Multi-Device Power Station",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 69.99,
    originalPrice: 89.99,
    rating: 4.8,
    reviewsCount: 620,
    badge: "ESSENTIAL",
    inStock: true,
    stockCount: 45,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["#18181b", "#cbd5e1"],
    description: "Compact GaN III technology charging brick capable of powering two MacBook Pros, an iPhone, and an Apple Watch concurrently at maximum thermal efficiency.",
    specs: {
      "Total Wattage": "140W Maximum Continuous Output",
      "Ports": "3x USB-C (PD 3.1) + 1x USB-A (QC 4+)",
      "Technology": "Navitas GaNFast III Semiconductor",
      "Protections": "Overvoltage, Overheat, Short-Circuit",
      "Weight": "210 Grams Ultra-Portable",
      "Certifications": "CE, FCC, RoHS, UL Certified"
    }
  },
  {
    id: 10,
    name: "AeroPods Elite Studio Earbuds",
    tagline: "Spatial Audio with Dynamic Head Tracking",
    category: "audio",
    categoryLabel: "Audio & Sound",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.7,
    reviewsCount: 380,
    badge: "TOP SELLER",
    inStock: true,
    stockCount: 31,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["#ffffff", "#09090b", "#6366f1"],
    description: "True wireless earbuds featuring dual balanced armature drivers, adaptive transparency mode, crystal clear 6-mic beamforming voice pickup, and Qi wireless case.",
    specs: {
      "Playback Time": "8 Hours (36 Hours total with wireless case)",
      "Water Resistance": "IPX5 Sweat & Rain Resistance",
      "Noise Isolation": "Real-Time Adaptive Acoustic Cancellation",
      "Codec Support": "LDAC, AAC, SBC, aptX Lossless",
      "Case Charging": "Qi Wireless Charging + USB Type-C",
      "Voice Assistant": "Native Siri & Google Assistant Support"
    }
  },
  {
    id: 11,
    name: "Lumina Halo 4K Streamer Webcam",
    tagline: "Sony STARVIS 2 Sensor with Built-In Ring Light",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 139.99,
    originalPrice: 179.99,
    rating: 4.8,
    reviewsCount: 195,
    badge: "CREATOR GEAR",
    inStock: true,
    stockCount: 18,
    image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["#18181b"],
    description: "Broadcast-quality 4K 60FPS webcam with Sony STARVIS 2 low-light sensor, AI auto-framing, dual noise-filtering microphones, and physical privacy shutter.",
    specs: {
      "Resolution": "4K Ultra HD @ 60 FPS / 1080p @ 120 FPS",
      "Sensor": "Sony STARVIS 2 1/1.8\" CMOS Sensor",
      "Field of View": "Adjustable 65°, 78°, and 90° FOV",
      "Focus": "Phase Detection Autofocus (PDAF)",
      "Lighting": "Adjustable Warm/Cool LED Ring Diffuser",
      "Mount": "Universal Monitor Clip + 1/4\" Tripod Thread"
    }
  },
  {
    id: 12,
    name: "TitanDesk Smart Magnetic Desk Mat",
    tagline: "Wireless Fast-Charging Vegan Leather Pad",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 54.99,
    originalPrice: 74.99,
    rating: 4.6,
    reviewsCount: 142,
    badge: "POPULAR",
    inStock: true,
    stockCount: 26,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["#27272a", "#78350f", "#1e293b"],
    description: "Elevate your desktop setup with waterproof vegan leather, integrated 15W Qi dual magnetic wireless phone/earbud charger, and magnetic cable organizers.",
    specs: {
      "Dimensions": "900mm x 420mm (Extra Large)",
      "Material": "Waterproof Spill-Resistant Vegan Saffiano",
      "Charging": "Dual 15W + 5W Wireless Fast Charger Built-In",
      "Underlay": "Anti-Slip Natural Textured Cork Base",
      "Included Accessories": "3x Magnetic Cable Holders + 2m Braided Cable"
    }
  }
];

// Product categories filter list
const PRODUCT_CATEGORIES = [
  { id: "all", label: "All Tech Products", icon: "fa-border-all" },
  { id: "audio", label: "Audio & Sound", icon: "fa-headphones" },
  { id: "wearables", label: "Smart Wearables", icon: "fa-clock" },
  { id: "laptops", label: "Laptops & PCs", icon: "fa-laptop" },
  { id: "phones", label: "Smartphones", icon: "fa-mobile-screen-button" },
  { id: "gaming", label: "Gaming Gear", icon: "fa-gamepad" },
  { id: "accessories", label: "Accessories", icon: "fa-bolt" }
];

// Active Discount Coupons
const DISCOUNT_COUPONS = {
  "PRI23": { discount: 20, type: "percent", label: "20% Special Discount (PRI23)" },
  "TECH20": { discount: 20, type: "percent", label: "20% Flash College Discount" },
  "COLLEGE10": { discount: 10, type: "percent", label: "10% Student Special" },
  "NEXUS50": { discount: 50, type: "fixed", label: "$50 Flat Voucher (Min $200)" },
  "FREESHIP": { discount: 15, type: "shipping", label: "Free Express Shipping" }
};

// Customer Reviews Mock Data
const TESTIMONIALS_DATA = [
  {
    name: "Alex Rivera",
    role: "Full Stack Engineer & Audio Enthusiast",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    review: "The Nebula Aurora NC headphones exceeded every single expectation. The build quality, soundstage, and battery are completely unrivaled. Fastest delivery ever!",
    productName: "Aurora NC Headphones"
  },
  {
    name: "Sophia Chen",
    role: "Computer Science Graduate & Streamer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    review: "Nexus Tech has the most fluid and beautiful shopping experience I've encountered. Ordered the Vortex Pro 16 and received tracking updates directly to delivery.",
    productName: "Vortex Pro 16 Ultrabook"
  },
  {
    name: "David Miller",
    role: "Hardware Architect & Gamer",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    review: "Apex Pulse keyboard is pure perfection. Rapid-trigger magnetic switches cut down my input latency instantly. Will buy all my accessories here!",
    productName: "Apex Pulse RGB Keyboard"
  }
];
