/**
 * AVINYA '27 - MASTER KNOWLEDGE & EVENT REPOSITORY (EXTENDED)
 * Indian Institute of Information Technology, Dharwad
 * --------------------------------------------------------------------
 * Includes:
 * - Detailed Podium Cash Prize Splits (1st, 2nd, 3rd + Berries)
 * - Official Corporate & Tech Sponsors with declared category & spending budgets
 * - Direct QR registration links
 * - Host student clubs & faculty leads
 */

window.AVINYA_DATA = {
  fest: {
    name: "AVINYA '27",
    edition: "4th National Edition",
    institution: "Indian Institute of Information Technology, Dharwad",
    tagline: "The 3-Day Techno-Cultural Odyssey of IIIT Dharwad",
    dates: "March 12, 13 & 14, 2027",
    venue: "IIIT Dharwad Permanent Campus, Ittigatti Road, Dharwad, Karnataka 580009",
    coordinates: "15.4288° N, 75.0560° E",
    countdownTarget: "2027-03-12T09:00:00+05:30",
    hack2futureUrl: "https://hack2future.iiitdwd.ac.in/",
    registrationFormUrl: "https://forms.gle/avinya27-register"
  },

  islands: [
    {
      id: "day1",
      dayNumber: "DAY 01",
      date: "Friday, March 12, 2027",
      name: "The Last Outpost",
      theme: "Dune Desert Sci-Fi",
      tagline: "Decipher the Ancient Monoliths of Code across the Shifting Dunes",
      accentColor: "#F59E0B",
      badge: "Arid Sector // Compass Locked",
      heroImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80",
      summary: "Step onto an ancient planetary desert where shifting dunes meet colossal monolithic citadels. Hosted in partnership with Velocity Coding Club, IEEE Student Branch, and the VLSI Society.",
      coordinators: [
        { name: "Aarav Sharma", role: "Overall Day 1 Lead (Velocity)", contact: "+91 98765 43210", email: "aarav.velocity@iiitdwd.ac.in" },
        { name: "Dr. K. Venkatesh", role: "Faculty Advisor (Dept of CSE)", contact: "Ext 7104", email: "kvenkatesh@iiitdwd.ac.in" }
      ],
      events: [
        {
          id: "d1-e1",
          title: "Algorithmic Dunes (Flagship CP)",
          club: "Velocity Coding Club",
          clubLogo: "code-2",
          category: "Competitive Programming",
          time: "10:00 AM - 01:30 PM",
          venue: "Main Computing Complex (Lab 1 & 2)",
          totalBounty: "₹35,000",
          totalBerries: "฿ 35,000,000",
          podium: {
            first: "₹20,000 + Gold Medal",
            second: "₹10,000 + Silver Medal",
            third: "₹5,000 + Bronze Medal"
          },
          teamSize: "1-2 Pilots",
          image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
          summary: "Speed, complexity analysis, and mathematical logic collide. Tackle ICPC-level graph algorithms, dynamic programming, and number theory challenges under extreme clock pressure.",
          rounds: [
            "Round 1: Rapid Algorithmic Fire (60 mins, 5 algorithmic puzzles)",
            "Round 2: The Monolith Challenge (90 mins, high-order DP & Graph theory)"
          ],
          rules: [
            "Allowed languages: C++20, Python 3.11, Java 17",
            "Individual or duo participation permitted",
            "Code plagiarism or external AI assistance leads to instant blacklisting across Avinya"
          ],
          coordinator: {
            name: "Devansh Patel",
            role: "Competitive Programming Lead (Velocity)",
            contact: "+91 91234 56781",
            email: "devansh.patel@iiitdwd.ac.in"
          },
          facultyLead: "Dr. K. Venkatesh (Associate Prof, CSE)",
          sponsors: [
            {
              name: "JetBrains",
              tier: "Title Tooling Sponsor",
              category: "Developer IDEs & Cloud Licenses",
              spending: "₹1,20,000 in Software Licenses + Cash Grants",
              logo: "terminal"
            },
            {
              name: "CodeChef / Unstop",
              tier: "Platform Partner",
              category: "Contest Infrastructure",
              spending: "₹60,000 Platform Support",
              logo: "server"
            }
          ]
        },
        {
          id: "d1-e2",
          title: "Sand-Cipher: National CTF",
          club: "Cyber Security Wing",
          clubLogo: "shield-alert",
          category: "Cybersecurity & Exploitation",
          time: "02:00 PM - 06:30 PM",
          venue: "Systems & Security Lab (Academic Block)",
          totalBounty: "₹40,000",
          totalBerries: "฿ 40,000,000",
          podium: {
            first: "₹25,000 + Cyber Shield",
            second: "₹10,000",
            third: "₹5,000"
          },
          teamSize: "Squad of 2-4",
          image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
          summary: "A military-grade Capture The Flag war. Exploit vulnerable binary containers, decrypt sand-cipher hashes, and retrieve concealed flags from sandboxed alien nodes.",
          rounds: [
            "Phase 1: Web Exploitation & Reverse Cryptography",
            "Phase 2: Binary Forensics & Sandboxed Privilege Escalation"
          ],
          rules: [
            "Do not target or DOS the competition scoring infrastructure",
            "Official flag format: AVINYA{...}",
            "Dynamic point decay applies on first-blood solves"
          ],
          coordinator: {
            name: "Rohan Iyer",
            role: "CTF Architect",
            contact: "+91 94561 23789",
            email: "rohan.ctf@iiitdwd.ac.in"
          },
          facultyLead: "Dr. Sandeep K. (Cyber Security Research Group)",
          sponsors: [
            {
              name: "CrowdStrike / Snyk",
              tier: "Security Patron",
              category: "Cyber Threat Intelligence",
              spending: "₹1,50,000 Grant & Swag Kits",
              logo: "shield-check"
            }
          ]
        },
        {
          id: "d1-e3",
          title: "YUKTI: Silicon & VLSI Showdown",
          club: "Hardware & VLSI Club",
          clubLogo: "cpu",
          category: "Chip Design & Embedded",
          time: "11:30 AM - 03:00 PM",
          venue: "Embedded Systems Hardware Lab",
          totalBounty: "₹30,000",
          totalBerries: "฿ 30,000,000",
          podium: {
            first: "₹18,000 + FPGA Dev Kit",
            second: "₹8,000",
            third: "₹4,000"
          },
          teamSize: "Solo or Duo",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
          summary: "Verilog and RTL synthesis design sprint. Optimize low-power digital circuits and solve hardware pipeline bottlenecks for next-gen edge AI accelerators.",
          rounds: [
            "Stage 1: RTL Coding & Waveform Debugging",
            "Stage 2: FPGA Implementation & Latency Benchmarking"
          ],
          rules: [
            "Open-source EDA tools (Icarus Verilog, GTKWave) provided",
            "Verilog-2001 or SystemVerilog standards enforced"
          ],
          coordinator: {
            name: "Tanvi Kulkarni",
            role: "VLSI Lead",
            contact: "+91 88765 12093",
            email: "tanvi.vlsi@iiitdwd.ac.in"
          },
          facultyLead: "Prof. R. M. Hegde (Dean R&D)",
          sponsors: [
            {
              name: "Cadence Design Systems",
              tier: "Title Hardware Sponsor",
              category: "Semiconductor EDA Tools",
              spending: "₹2,00,000 Educational Tooling Licenses",
              logo: "layers"
            }
          ]
        },
        {
          id: "d1-e4",
          title: "Dune Rover Autonomous Challenge",
          club: "Quantum Robotics Society",
          clubLogo: "bot",
          category: "Autonomous Robotics",
          time: "03:30 PM - 06:30 PM",
          venue: "Central Courtyard Desert Arena",
          totalBounty: "₹35,000",
          totalBerries: "฿ 35,000,000",
          podium: {
            first: "₹20,000",
            second: "₹10,000",
            third: "₹5,000"
          },
          teamSize: "Crew of 2-4",
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
          summary: "Custom robotic rovers traverse loose-sand dunes, steep gravel inclines, and radioactive rock collection zones under real-time telemetry.",
          rounds: [
            "Trial 1: Timed Dune Slalom & Suspension Test",
            "Trial 2: Autonomous Obstacle Avoidance & Soil Sample Extraction"
          ],
          rules: [
            "Max chassis size: 45 x 45 cm; max weight: 6.0 kg",
            "2.4 GHz RC or onboard Raspberry Pi / ROS 2 autonomy permitted"
          ],
          coordinator: {
            name: "Sameer Joshi",
            role: "Robotics Marshal",
            contact: "+91 99123 45670",
            email: "sameer.robotics@iiitdwd.ac.in"
          },
          facultyLead: "Dr. P. G. Sunagar (Robotics Lab)",
          sponsors: [
            {
              name: "Robu.in & Robokits",
              tier: "Component Sponsor",
              category: "Hardware Actuators & Sensors",
              spending: "₹80,000 Hardware Vouchers",
              logo: "cpu"
            }
          ]
        }
      ]
    },

    {
      id: "day2",
      dayNumber: "DAY 02",
      date: "Saturday, March 13, 2027",
      name: "The Pandemonium",
      theme: "Synthwave Cyberpunk",
      tagline: "Overclock the Neon Surge in the Digital Cyber-Metropolis",
      accentColor: "#EC4899",
      badge: "High Distortion // Magnetic Overdrive",
      heroImage: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1600&q=80",
      summary: "Neon magenta rain, electric water reflections, and hyper-caffeinated energy. The Pandemonium brings heavy bot combat, national e-sports face-offs, and UI/UX design sprints.",
      coordinators: [
        { name: "Karthik Menon", role: "Overall Day 2 Lead (Robotics)", contact: "+91 97890 12345", email: "karthik.robotics@iiitdwd.ac.in" },
        { name: "Dr. Ananya Roy", role: "Faculty Advisor (Student Affairs)", contact: "Ext 7109", email: "ananya.roy@iiitdwd.ac.in" }
      ],
      events: [
        {
          id: "d2-e1",
          title: "RoboWars: Cyber Clash",
          club: "Quantum Robotics Society",
          clubLogo: "swords",
          category: "Combat Robotics",
          time: "11:00 AM - 04:00 PM",
          venue: "The Steel Pit (Central Open Amphitheater)",
          totalBounty: "₹60,000",
          totalBerries: "฿ 60,000,000",
          podium: {
            first: "₹35,000 + The Steel Titan Trophy",
            second: "₹18,000",
            third: "₹7,000"
          },
          teamSize: "Crew of 3-5",
          image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80",
          summary: "Armored fighting robots clash inside a bulletproof 12mm polycarbonate battle cage. Pneumatic flippers, spinning drums, and titanium wedges collide.",
          rounds: [
            "Round 1: Qualifying Deathmatches (3-minute survival bouts)",
            "Round 2: Double Elimination Knockout Bracket"
          ],
          rules: [
            "Weight Classes: 15kg (Featherweight) & 30kg (Middleweight)",
            "Active weapons mandatory; bot failsafe kill-switch required"
          ],
          coordinator: {
            name: "Vikram Singhal",
            role: "Combat Safety Lead",
            contact: "+91 96543 21876",
            email: "vikram.combat@iiitdwd.ac.in"
          },
          facultyLead: "Dr. Ananya Roy",
          sponsors: [
            {
              name: "Bosch Power Tools",
              tier: "Armor & Fabrication Partner",
              category: "Industrial Engineering",
              spending: "₹1,80,000 Cash & Fabrication Rigging",
              logo: "wrench"
            }
          ]
        },
        {
          id: "d2-e2",
          title: "Neon Overdrive: Spatial UI/UX",
          club: "Mosaic Design Club",
          clubLogo: "palette",
          category: "Product & Spatial Design",
          time: "01:00 PM - 05:00 PM",
          venue: "Digital Media & Design Studio",
          totalBounty: "₹25,000",
          totalBerries: "฿ 25,000,000",
          podium: {
            first: "₹15,000 + Pro Subscription",
            second: "₹7,000",
            third: "₹3,000"
          },
          teamSize: "Solo or Duo",
          image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
          summary: "Design the spatial operating HUD for next-gen autonomous marine vessels or cyberpunk operating systems inside 4 rapid hours.",
          rounds: [
            "Phase 1: Mystery Prompt Reveal & Information Architecture",
            "Phase 2: High-Fidelity Prototype & Interactive Micro-Interactions"
          ],
          rules: [
            "Figma, Spline 3D, or Framer allowed",
            "Judged on ergonomics, design tokens & visual storytelling"
          ],
          coordinator: {
            name: "Shruti Hegde",
            role: "Design Lead (Mosaic)",
            contact: "+91 98123 45609",
            email: "shruti.design@iiitdwd.ac.in"
          },
          facultyLead: "Dr. Sudha B. (Human Computer Interaction)",
          sponsors: [
            {
              name: "Figma & Spline",
              tier: "Official Design Partner",
              category: "Design Software Subscriptions",
              spending: "₹1,00,000 in Pro Credits",
              logo: "pen-tool"
            }
          ]
        },
        {
          id: "d2-e3",
          title: "RetroWave E-Sports Arena",
          club: "Gaming & Esports Syndicate",
          clubLogo: "gamepad-2",
          category: "Competitive Esports",
          time: "02:00 PM - 08:30 PM",
          venue: "Indoor Sports Complex & LAN Arena",
          totalBounty: "₹50,000",
          totalBerries: "฿ 50,000,000",
          podium: {
            first: "₹30,000 (Valorant Champions)",
            second: "₹15,000 (BGMI Squad Winners)",
            third: "₹5,000 (MVP Awards)"
          },
          teamSize: "Squad of 5",
          image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
          summary: "National inter-college championships for Valorant and BGMI with live casters, dedicated high-refresh LAN rigs, and stadium screen projection.",
          rounds: [
            "Valorant: Single-elimination BO1, Grand Finals BO3",
            "BGMI: 4-Match Custom Lobby Erangel & Miramar Rotation"
          ],
          rules: ["Official tournament competitive rules apply", "Zero tolerance for toxicity"],
          coordinator: {
            name: "Aman Shaikh",
            role: "LAN Administrator",
            contact: "+91 91238 90123",
            email: "aman.gaming@iiitdwd.ac.in"
          },
          facultyLead: "Sports Board Coordinator",
          sponsors: [
            {
              name: "Red Bull & Logitech G",
              tier: "Gaming & Energy Title Sponsor",
              category: "Peripherals & Energy Stash",
              spending: "₹2,50,000 LAN Hardware & Refreshments",
              logo: "zap"
            }
          ]
        },
        {
          id: "d2-e4",
          title: "Cyber Beats: DJ War & Beatbox",
          club: "440 Hz (Music Club)",
          clubLogo: "disc",
          category: "Music Production",
          time: "07:30 PM - 10:30 PM",
          venue: "Main Open Air Amphitheatre",
          totalBounty: "₹30,000",
          totalBerries: "฿ 30,000,000",
          podium: {
            first: "₹18,000",
            second: "₹8,000",
            third: "₹4,000"
          },
          teamSize: "Solo Performers",
          image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
          summary: "Synthesizers, turntables, and vocal percussion. Underground electronic producers and beatboxers battle in head-to-head neon combat.",
          rounds: [
            "Round 1: 3-Minute Beatbox Freestyle Battle",
            "Round 2: 10-Minute Live DJ Mixing Set"
          ],
          rules: ["Pioneer CDJ / Rekordbox setup provided on stage"],
          coordinator: {
            name: "Varun Nair",
            role: "Audio Coordinator (440 Hz)",
            contact: "+91 99876 54321",
            email: "varun.music@iiitdwd.ac.in"
          },
          facultyLead: "Cultural Committee",
          sponsors: [
            {
              name: "Audio-Technica & Pioneer DJ",
              tier: "Stage Audio Partner",
              category: "Studio Monitors & Headphones",
              spending: "₹1,20,000 Sound Gear Grants",
              logo: "headphones"
            }
          ]
        }
      ]
    },

    {
      id: "day3",
      dayNumber: "DAY 03",
      date: "Sunday, March 14, 2027",
      name: "The Carnival Island",
      theme: "Grand Midnight Festival",
      tagline: "Celebrate the Grand Finale Across Golden Illuminated Waters",
      accentColor: "#EAB308",
      badge: "Critical Overload // Grand Revelry",
      heroImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80",
      summary: "Glowing Ferris wheels, floating lantern waters, and electrifying stage lights. Day 3 features massive group choreography, national band battles, haute couture fashion, and the grand celebrity Star-Nite concert.",
      coordinators: [
        { name: "Ananya Dixit", role: "Overall Cultural Secretary (Dynamight)", contact: "+91 98450 98765", email: "ananya.cultural@iiitdwd.ac.in" },
        { name: "Prof. S. R. Patil", role: "Faculty Chairperson (Cultural Board)", contact: "Ext 7101", email: "srpatil@iiitdwd.ac.in" }
      ],
      events: [
        {
          id: "d3-e1",
          title: "Star-Nite: Grand Celebrity Concert",
          club: "440 Hz & Avinya Core",
          clubLogo: "sparkles",
          category: "Pro-Nite Flagship Concert",
          time: "07:30 PM - 11:30 PM",
          venue: "The Grand Festival Grounds (Main Stage)",
          totalBounty: "National Star Headline",
          totalBerries: "VIP Golden Circle Passes",
          podium: {
            first: "Access Pass included with Fest Wristband",
            second: "Exclusive VIP Backstage Meet & Greet Passes",
            third: "Artist Signed Merchandise"
          },
          teamSize: "All Attendees",
          image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=80",
          summary: "The crowning glory of Avinya '27! A headline Bollywood & Indie-pop star alongside high-energy EDM festival DJs performing under a multi-million-lumen light rig.",
          rounds: [
            "Opening Act: Best of 440 Hz Campus Band (07:30 PM)",
            "Headline Celebrity Artist Live Concert (08:30 PM)",
            "Midnight EDM Laser Show & Fireworks (10:30 PM)"
          ],
          rules: ["Avinya RFID Wristband mandatory for entry", "Gates close strictly at 08:15 PM"],
          coordinator: {
            name: "Ananya Dixit",
            role: "Cultural Secretary",
            contact: "+91 98450 98765",
            email: "ananya.cultural@iiitdwd.ac.in"
          },
          facultyLead: "Prof. S. R. Patil",
          sponsors: [
            {
              name: "Spotify India & Coke Studio",
              tier: "Concert Presenting Partner",
              category: "Live Stage Production",
              spending: "₹12,00,000 Artist Production & Sound Setup",
              logo: "music"
            }
          ]
        },
        {
          id: "d3-e2",
          title: "Rhythm of the Tide: Mega Choreo",
          club: "Dynamight Dance Club",
          clubLogo: "flame",
          category: "Group Dance Championship",
          time: "01:00 PM - 05:00 PM",
          venue: "Main Stage Auditorium",
          totalBounty: "₹45,000",
          totalBerries: "฿ 45,000,000",
          podium: {
            first: "₹25,000 + Golden Nataraja Trophy",
            second: "₹12,000",
            third: "₹8,000"
          },
          teamSize: "Crew of 8-25",
          image: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80",
          summary: "Eastern and Western dance crews battle for the National Avinya Trophy. Dramatic thematic storytelling, seamless sync, and aerial stunts.",
          rounds: [
            "Main Performance: 8-12 Minute Thematic Showcase",
            "Jury Adjudication & Crew Score Disclosure"
          ],
          rules: ["Soundtrack must be submitted 24 hours prior in FLAC/MP3 320kbps"],
          coordinator: {
            name: "Ritika Sen",
            role: "Dance Head (Dynamight)",
            contact: "+91 97890 23456",
            email: "ritika.dance@iiitdwd.ac.in"
          },
          facultyLead: "Cultural Committee",
          sponsors: [
            {
              name: "Fastrack & Puma",
              tier: "Youth & Style Sponsor",
              category: "Apparel & Merchandise",
              spending: "₹1,50,000 Crew Kits & Cash",
              logo: "tag"
            }
          ]
        },
        {
          id: "d3-e3",
          title: "Battle of the Bands: Sound Clash",
          club: "440 Hz (Music Club)",
          clubLogo: "volume-2",
          category: "Live Rock & Fusion",
          time: "10:30 AM - 01:30 PM",
          venue: "Acoustic Amphitheater",
          totalBounty: "₹35,000",
          totalBerries: "฿ 35,000,000",
          podium: {
            first: "₹20,000 + Studio Recording Slot",
            second: "₹10,000",
            third: "₹5,000"
          },
          teamSize: "Band of 3-8",
          image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
          summary: "Live rock, metal, funk, and Indian classical fusion bands tear through amplifiers. High-gain distortion, thunderous drum solos, and vocal range.",
          rounds: ["Stage Set: 15-Minute Slot including line-check", "Min 1 original composition mandatory"],
          rules: ["Drum kit, bass rig, and PA provided; bring own guitars and pedals"],
          coordinator: {
            name: "Neil D'Souza",
            role: "Band Lead",
            contact: "+91 94567 89012",
            email: "neil.bands@iiitdwd.ac.in"
          },
          facultyLead: "Prof. S. R. Patil",
          sponsors: [
            {
              name: "Fender & Marshall Amps",
              tier: "Backline Instrument Sponsor",
              category: "Musical Instrument Backline",
              spending: "₹2,00,000 Stage Gear & Amp Rigs",
              logo: "radio"
            }
          ]
        },
        {
          id: "d3-e4",
          title: "Haute Couture: The Grand Runway",
          club: "Mosaic Arts Club",
          clubLogo: "sparkle",
          category: "Fashion & Theatrics",
          time: "05:00 PM - 07:00 PM",
          venue: "Grand Ramp Walkway (Main Stage)",
          totalBounty: "₹30,000",
          totalBerries: "฿ 30,000,000",
          podium: {
            first: "₹18,000 + Best Designer Trophy",
            second: "₹8,000",
            third: "₹4,000"
          },
          teamSize: "Team of 10-18",
          image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
          summary: "A high-fashion spectacle blending traditional Karnataka silk textiles, cyberpunk armor aesthetics, and avant-garde futuristic silhouettes.",
          rounds: ["Theme Showcase: 'Nautical Horizons & Cybernetic Silk'", "Model Poise & Best Designer Round"],
          rules: ["Time limit: 10 minutes runway presence per college"],
          coordinator: {
            name: "Meera Nair",
            role: "Runway Director",
            contact: "+91 93451 09876",
            email: "meera.fashion@iiitdwd.ac.in"
          },
          facultyLead: "Cultural Board",
          sponsors: [
            {
              name: "FabIndia & Nykaa",
              tier: "Fashion & Beauty Partner",
              category: "Runway Cosmetics & Silk Textiles",
              spending: "₹1,50,000 Hamper Hampers & Cash",
              logo: "heart"
            }
          ]
        }
      ]
    }
  ],

  hack2future: {
    id: "hack2future",
    title: "HACK2FUTURE '27",
    tagline: "The Flagship National Astronaut Hackathon",
    institution: "IIIT Dharwad // Research & Innovation Park",
    badge: "Ascent Vector: Stratosphere // Orbit Locked",
    officialUrl: "https://hack2future.iiitdwd.ac.in/",
    theme: "Astronaut Deep Space Odyssey",
    prizePool: "₹1,50,000+",
    berriesPrize: "฿ 150,000,000",
    duration: "36 Hours Non-Stop",
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    astronautImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    description: "Breach through the earth's atmosphere. Hack2Future is the premier 36-hour hackathon challenging developers, designers, and innovators to solve cutting-edge industry problems under zero-gravity conditions.",
    tracks: [
      {
        id: "t1",
        name: "Autonomous AI & Agentic Systems",
        icon: "cpu",
        bounty: "₹40,000",
        description: "Build next-gen autonomous LLM agents, multimodality pipelines, and decision intelligence tools for enterprise workflows."
      },
      {
        id: "t2",
        name: "Cosmic Web3 & Cryptographic Rails",
        icon: "shield",
        bounty: "₹40,000",
        description: "Zero-knowledge proofs, decentralized physical infrastructure networks (DePIN), and censorship-resistant protocols."
      },
      {
        id: "t3",
        name: "BioTech, Health & Planetary Sensors",
        icon: "activity",
        bounty: "₹35,000",
        description: "Remote telemetry, health diagnostic models, and planetary climate intelligence data systems."
      },
      {
        id: "t4",
        name: "Open Orbit / Uncharted Innovation",
        icon: "compass",
        bounty: "₹35,000",
        description: "No boundaries. Tackle real-world civic, space exploration, or campus challenges with deep-tech hacks."
      }
    ],
    timeline: [
      { phase: "Phase 01", title: "Online Registration & Problem Statement Blueprint", date: "Until Feb 28, 2027", status: "Open Now" },
      { phase: "Phase 02", title: "National Shortlisting & Crew Finalization", date: "March 05, 2027", status: "Upcoming" },
      { phase: "Phase 03", title: "36-Hour Offline Hackathon Kickoff at IIITDWD", date: "March 12, 10:00 AM", status: "Grand Stage" },
      { phase: "Phase 04", title: "Final Pitch & Bounty Award Ceremony", date: "March 13, 08:00 PM", status: "Victory" }
    ],
    sponsors: [
      {
        name: "Google Cloud",
        tier: "Title Cloud Infrastructure Sponsor",
        category: "Vertex AI & Cloud Credits",
        spending: "₹4,00,000 in Vertex AI Credits & Grants",
        logo: "cloud"
      },
      {
        name: "GitHub",
        tier: "Developer Experience Partner",
        category: "Copilot & Enterprise Tools",
        spending: "₹1,50,000 in Copilot Subscriptions & Swag",
        logo: "github"
      },
      {
        name: "Polygon Labs",
        tier: "Web3 Track Partner",
        category: "Blockchain Bounty",
        spending: "₹1,00,000 Direct Track Cash Bounty",
        logo: "shield"
      }
    ]
  },

  faqs: [
    {
      q: "What is Avinya '27 and who is eligible to participate?",
      a: "Avinya is the annual techno-cultural fest of IIIT Dharwad. Students from all recognized universities, engineering colleges, and design institutions across India are eligible to compete in both technical, cultural, gaming, and hackathon events."
    },
    {
      q: "How does Hack2Future integrate with Avinya?",
      a: "Hack2Future is the flagship national hackathon of IIIT Dharwad happening right inside Avinya. Participants registered for Hack2Future get full access to the fest, technical keynotes, and evening cultural pro-nites."
    },
    {
      q: "Is accommodation provided for outstation teams?",
      a: "Yes! Dedicated hostel accommodation and meal packages are provided on campus at IIIT Dharwad for registered outstation teams on a subsidized first-come, first-served basis."
    },
    {
      q: "How does the boat navigation and 3 Islands concept work?",
      a: "Avinya is designed as an interactive nautical journey across 3 themed islands: Day 1 (The Last Outpost - Dune Desert), Day 2 (The Pandemonium - Synthwave Cyberpunk), and Day 3 (The Carnival Island - Grand Night Festival). Hack2Future is our cosmic ascension section into deep space!"
    }
  ]
};
