/**
 * AVINYA '27 - MASTER KNOWLEDGE & EVENT REPOSITORY
 * Indian Institute of Information Technology, Dharwad
 * --------------------------------------------------------------------
 * Real IIIT Dharwad Student Bodies & Clubs Integrated:
 * - Velocity (Algorithmic & Coding Club)
 * - 440 Hz (Official Music Club)
 * - Dynamight (Official Dance Club)
 * - E-Cell & IEEE Student Branch (The Pioneer Series)
 * - YUKTI / VLSI & Embedded Systems Club
 * - Quantum / Robotics & Automation Society
 * - Mosaic (Fine Arts & Design Club)
 * - Inksomnia (Literary & Debating Society)
 * - IIIT Dharwad Research Park (Hack2Future Co-host)
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
    registrationFormUrl: "https://forms.gle/avinya27-register",
    brochureUrl: "#",
    helpdesk: {
      email: "avinya@iiitdwd.ac.in",
      phone: "+91 836 225 7000",
      emergency: "+91 94812 34567"
    }
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
          category: "Competitive Programming",
          time: "10:00 AM - 01:30 PM",
          venue: "Main Computing Complex (Lab 1 & 2)",
          bounty: "₹35,000",
          berries: "฿ 35,000,000",
          teamSize: "1-2 Pilots",
          image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
          summary: "Speed, complexity analysis, and mathematical logic collide. Tackle ICPC-level graph algorithms, dynamic programming, and number theory challenges.",
          rounds: [
            "Round 1: Rapid Algorithmic Fire (60 mins, 5 algorithmic puzzles)",
            "Round 2: The Monolith Challenge (90 mins, high-order DP & Graph theory)"
          ],
          rules: [
            "Allowed languages: C++20, Python 3.11, Java 17",
            "Individual or duo participation permitted",
            "Code plagiarism leads to instant blacklisting across Avinya"
          ],
          coordinator: "Devansh Patel (+91 91234 56781)"
        },
        {
          id: "d1-e2",
          title: "Sand-Cipher: National CTF",
          club: "Cyber Security Wing",
          category: "Cybersecurity",
          time: "02:00 PM - 06:30 PM",
          venue: "Systems & Security Lab (Academic Block)",
          bounty: "₹40,000",
          berries: "฿ 40,000,000",
          teamSize: "Squad of 2-4",
          image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
          summary: "A military-grade Capture The Flag war. Exploit vulnerable binary containers, decrypt sand-cipher hashes, and retrieve concealed flags.",
          rounds: [
            "Phase 1: Web Exploitation & Reverse Cryptography",
            "Phase 2: Binary Forensics & Sandboxed Privilege Escalation"
          ],
          rules: [
            "Do not target or DOS the competition scoring infrastructure",
            "Official flag format: AVINYA{...}",
            "Dynamic point decay applies on first-blood solves"
          ],
          coordinator: "Rohan Iyer (+91 94561 23789)"
        },
        {
          id: "d1-e3",
          title: "YUKTI: Silicon & VLSI Showdown",
          club: "Hardware & VLSI Club",
          category: "Chip Design & Embedded",
          time: "11:30 AM - 03:00 PM",
          venue: "Embedded Systems Hardware Lab",
          bounty: "₹30,000",
          berries: "฿ 30,000,000",
          teamSize: "Solo or Duo",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
          summary: "Verilog and RTL synthesis design sprint. Optimize low-power digital circuits and solve hardware pipeline bottlenecks for edge AI devices.",
          rounds: [
            "Stage 1: RTL Coding & Waveform Debugging",
            "Stage 2: FPGA Implementation & Latency Benchmarking"
          ],
          rules: [
            "Open-source EDA tools (Icarus Verilog, GTKWave) provided",
            "Verilog-2001 or SystemVerilog standards"
          ],
          coordinator: "Tanvi Kulkarni (+91 88765 12093)"
        },
        {
          id: "d1-e4",
          title: "Dune Rover Autonomous Challenge",
          club: "Quantum Robotics Society",
          category: "Robotics",
          time: "03:30 PM - 06:30 PM",
          venue: "Central Courtyard Desert Arena",
          bounty: "₹35,000",
          berries: "฿ 35,000,000",
          teamSize: "Crew of 2-4",
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
          summary: "Custom robotic rovers traverse treacherous loose-sand dunes, steep elevation obstacles, and radioactive rock collection zones.",
          rounds: [
            "Trial 1: Timed Dune Slalom & Suspension Test",
            "Trial 2: Autonomous Obstacle Avoidance & Soil Sample Extraction"
          ],
          rules: [
            "Max chassis size: 45 x 45 cm; max weight: 6.0 kg",
            "2.4 GHz RC or onboard Raspberry Pi / ESP32 autonomy permitted"
          ],
          coordinator: "Sameer Joshi (+91 99123 45670)"
        },
        {
          id: "d1-e5",
          title: "The Pioneer Series (E-Summit Conclave)",
          club: "E-Cell & IEEE Branch",
          category: "Startup Conclave",
          time: "05:00 PM - 07:30 PM",
          venue: "Main Auditorium Prime",
          bounty: "₹50,000 Incubation Grants",
          berries: "Seed Angel Perks",
          teamSize: "1-4 Founders",
          image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
          summary: "The flagship startup elevator pitch of IIIT Dharwad. Pitch innovative tech products directly to angel investors, venture funds, and founders.",
          rounds: [
            "Round 1: 3-Minute Lightning Pitch Deck",
            "Round 2: Jury Cross-Examination & Unit Economics Defense"
          ],
          rules: [
            "Working MVP or prototype carries 40% evaluation weightage",
            "Eligibility: Students & early-stage bootstrapped founders"
          ],
          coordinator: "Nisha Rao (+91 97654 32189)"
        },
        {
          id: "d1-e6",
          title: "Inksomnia: Desert Diplomacy Debate",
          club: "Inksomnia Literary Society",
          category: "Literary & Debate",
          time: "02:30 PM - 05:30 PM",
          venue: "Seminar Hall 1",
          bounty: "₹15,000",
          berries: "฿ 15,000,000",
          teamSize: "Duo Delegation",
          image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
          summary: "Parliamentary debate simulating interplanetary governance, planetary resource extraction ethics, and sovereign AI charters.",
          rounds: [
            "Preliminary Debate: Parliamentary Motion Rounds",
            "Championship Face-off: Oxford-style Grand Final"
          ],
          rules: [
            "7 minutes prime speaker time; 1 minute POI",
            "Adjudicated under World Schools Debating Championship rules"
          ],
          coordinator: "Aditi Deshmukh (+91 93456 78120)"
        },
        {
          id: "d1-e7",
          isSlot: true,
          title: "Open Club Protocol: Slot 07",
          club: "Reserved for IIITDWD Student Bodies",
          category: "Upcoming Technical Workshop",
          time: "TBA - Allocated Day 1",
          venue: "Multi-Purpose Lab C",
          bounty: "₹20,000 Pool",
          berries: "฿ 20,000,000",
          teamSize: "Open Enrollment",
          image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
          summary: "Reserved slot for registered clubs to host hands-on tech masterclasses, generative AI pipelines, or competitive hack sessions.",
          rounds: ["Submissions open for student club leads"],
          rules: ["Must submit proposal to Avinya Council by Feb 20, 2027"],
          coordinator: "Avinya Secretariat (avinya@iiitdwd.ac.in)"
        },
        {
          id: "d1-e8",
          isSlot: true,
          title: "Uncharted Citadel: Slot 08",
          club: "Research & Innovation Wing",
          category: "Open Track Competition",
          time: "TBA - Evening Slot",
          venue: "Innovation Hub Floor 2",
          bounty: "Certificate & Cash Bounty",
          berries: "Honor Ledger",
          teamSize: "Individual / Teams",
          image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
          summary: "Designated space for guest tech exhibitions, patent showcases, and interactive hardware demonstrations.",
          rounds: ["To be announced upon final council approval"],
          rules: ["Subject to faculty review board"],
          coordinator: "Faculty Desk (+91 836 225 7000)"
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
          category: "Combat Robotics",
          time: "11:00 AM - 04:00 PM",
          venue: "The Steel Pit (Central Open Amphitheater)",
          bounty: "₹60,000",
          berries: "฿ 60,000,000",
          teamSize: "Crew of 3-5",
          image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80",
          summary: "Armored fighting robots clash inside a bulletproof 12mm polycarbonate battle cage. Pneumatic flippers, spinning drums, and titanium wedges collide.",
          rounds: [
            "Round 1: Qualifying Deathmatches (3-minute survival bouts)",
            "Round 2: Double Elimination Knockout Bracket"
          ],
          rules: [
            "Weight Classes: 15kg (Featherweight) & 30kg (Middleweight)",
            "Active weapons mandatory; bot failsafe kill-switch required",
            "No flames, liquid, or electromagnetic interference weapons"
          ],
          coordinator: "Vikram Singhal (+91 96543 21876)"
        },
        {
          id: "d2-e2",
          title: "Neon Overdrive: Spatial UI/UX Sprint",
          club: "Mosaic Design Club",
          category: "Product & UI/UX Design",
          time: "01:00 PM - 05:00 PM",
          venue: "Digital Media & Design Studio",
          bounty: "₹25,000",
          berries: "฿ 25,000,000",
          teamSize: "Solo or Duo",
          image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
          summary: "Design the operating HUD for next-gen cybernetic vessels, autonomous drone fleets, or futuristic urban logistics inside 4 rapid hours.",
          rounds: [
            "Phase 1: Mystery Prompt Reveal & Information Architecture",
            "Phase 2: High-Fidelity Prototype & Interactive Micro-Interactions"
          ],
          rules: [
            "Figma, Spline 3D, or Framer allowed",
            "All components must be designed during the event window",
            "Judged on ergonomics, design tokens & visual storytelling"
          ],
          coordinator: "Shruti Hegde (+91 98123 45609)"
        },
        {
          id: "d2-e3",
          title: "RetroWave E-Sports Arena",
          club: "Gaming & Esports Syndicate",
          category: "Competitive Gaming",
          time: "02:00 PM - 08:30 PM",
          venue: "Indoor Sports Complex & LAN Arena",
          bounty: "₹50,000",
          berries: "฿ 50,000,000",
          teamSize: "Squad of 5",
          image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
          summary: "National inter-college championships for Valorant and BGMI with live casters, dedicated high-refresh LAN rigs, and stadium screen projection.",
          rounds: [
            "Valorant: Single-elimination BO1, Grand Finals BO3",
            "BGMI: 4-Match Custom Lobby Erangel & Miramar Rotation"
          ],
          rules: [
            "Official tournament competitive rules apply",
            "Players may bring their own keyboards, mice, and headsets",
            "Zero tolerance for toxicity or unsanctioned macros"
          ],
          coordinator: "Aman Shaikh (+91 91238 90123)"
        },
        {
          id: "d2-e4",
          title: "Cyber Beats: DJ Clash & Beatbox War",
          club: "440 Hz (Music Club)",
          category: "Music & Audio Production",
          time: "07:30 PM - 10:30 PM",
          venue: "Main Open Air Amphitheatre",
          bounty: "₹30,000",
          berries: "฿ 30,000,000",
          teamSize: "Solo Performers",
          image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
          summary: "Synthesizers, turntables, and vocal percussion. Underground electronic producers and beatboxers battle in head-to-head neon combat.",
          rounds: [
            "Round 1: 3-Minute Beatbox Freestyle Battle",
            "Round 2: 10-Minute Live DJ Mixing Set"
          ],
          rules: [
            "Pioneer CDJ / Rekordbox setup provided on stage",
            "Judged on transitions, harmonic mixing & crowd energy"
          ],
          coordinator: "Varun Nair (+91 99876 54321)"
        },
        {
          id: "d2-e5",
          title: "Speed Drone Grand Prix",
          club: "Quantum Robotics Society",
          category: "FPV Drone Racing",
          time: "04:30 PM - 07:00 PM",
          venue: "Illuminated Obstacle Skyway (Athletic Field)",
          bounty: "₹35,000",
          berries: "฿ 35,000,000",
          teamSize: "1 Pilot + 1 Spotter",
          image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80",
          summary: "FPV quadcopters scream through illuminated neon neon gates, sharp hairpins, and elevated dive loops at speeds over 100 km/h.",
          rounds: [
            "Time Trials: 3 Laps Qualifying Seed",
            "Double Elimination Bracket: 4-Drone Simultaneous Race"
          ],
          rules: [
            "FPV 5.8 GHz video transmitters must adhere to assigned race bands",
            "Prop guards recommended; failsafe throttle cutoff mandatory"
          ],
          coordinator: "Sahil Kulkarni (+91 92345 67890)"
        },
        {
          id: "d2-e6",
          title: "Capture The Rhythm (Solo Dance Face-off)",
          club: "Dynamight Dance Club",
          category: "Street Dance",
          time: "06:00 PM - 08:00 PM",
          venue: "Auditorium Plaza",
          bounty: "₹20,000",
          berries: "฿ 20,000,000",
          teamSize: "Solo Dancers",
          image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
          summary: "Popping, locking, krump, and breaking. 1v1 cyphers under flashing neon strobe lights with surprise beat drop rotations.",
          rounds: [
            "Cypher Selection: 45-second solo improvisation",
            "Top 8 1v1 Battle Rounds"
          ],
          rules: [
            "Random DJ tracks played on spot",
            "Judged by national street dance choreographers"
          ],
          coordinator: "Pooja Reddy (+91 95432 10987)"
        },
        {
          id: "d2-e7",
          isSlot: true,
          title: "Open Gaming Protocol: Slot 07",
          club: "Reserved for IIITDWD Gaming Guild",
          category: "Console Arena / Sim Racing",
          time: "TBA - Afternoon Slot",
          venue: "Student Activity Center",
          bounty: "₹15,000 Bounty",
          berries: "฿ 15,000,000",
          teamSize: "Individual Slots",
          image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
          summary: "Racing simulator rigs, FIFA championships, and fighting game community brackets (Tekken 8 / Street Fighter 6).",
          rounds: ["To be finalized with partner gaming clubs"],
          rules: ["Bring your own controllers permitted"],
          coordinator: "Gaming Lead (+91 91234 50987)"
        },
        {
          id: "d2-e8",
          isSlot: true,
          title: "Uncharted Cyber-Matrix: Slot 08",
          club: "Tech Council IIIT Dharwad",
          category: "Special Surprise Hackathon Track",
          time: "TBA - Late Evening",
          venue: "Innovation Floor",
          bounty: "Surprise Perks & Tech Goodies",
          berries: "Special Badge",
          teamSize: "All Registered Hackers",
          image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
          summary: "Midnight lightning coding sprint with sponsor APIs and bonus bounty rewards for Hack2Future participants.",
          rounds: ["Announced live at 10 PM"],
          rules: ["Open to all verified fest badge holders"],
          coordinator: "Avinya Council (avinya@iiitdwd.ac.in)"
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
          category: "Pro-Nite Flagship",
          time: "07:30 PM - 11:30 PM",
          venue: "The Grand Festival Grounds (Main Stage)",
          bounty: "Epic Finale Showcase",
          berries: "VIP Golden Circle",
          teamSize: "All Attendees",
          image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80",
          summary: "The crowning glory of Avinya '27! A headline Bollywood & Indie-pop star alongside high-energy EDM festival DJs performing under a multi-million-lumen light rig.",
          rounds: [
            "Opening Act: Best of 440 Hz Campus Band (07:30 PM)",
            "Headline Celebrity Artist Live Concert (08:30 PM)",
            "Midnight EDM Laser Show & Fireworks (10:30 PM)"
          ],
          rules: [
            "Avinya RFID Wristband mandatory for entry",
            "Gates close strictly at 08:15 PM; no re-entry permitted",
            "Alcohol, tobacco, and sharp objects strictly prohibited"
          ],
          coordinator: "Festival Secretariat (+91 836 225 7000)"
        },
        {
          id: "d3-e2",
          title: "Rhythm of the Tide: Mega Choreo",
          club: "Dynamight Dance Club",
          category: "Group Choreography",
          time: "01:00 PM - 05:00 PM",
          venue: "Main Stage Auditorium",
          bounty: "₹45,000",
          berries: "฿ 45,000,000",
          teamSize: "Crew of 8-25",
          image: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80",
          summary: "Eastern and Western dance crews battle for the National Avinya Trophy. Dramatic thematic storytelling, seamless sync, and aerial stunts.",
          rounds: [
            "Main Performance: 8-12 Minute Thematic Showcase",
            "Jury Adjudication & Crew Score Disclosure"
          ],
          rules: [
            "Soundtrack must be submitted 24 hours prior in FLAC/MP3 320kbps",
            "Props must be cleared with stage management beforehand",
            "Points awarded for synchronicity, concept, costumes & energy"
          ],
          coordinator: "Ritika Sen (+91 97890 23456)"
        },
        {
          id: "d3-e3",
          title: "Battle of the Bands: Sound Clash",
          club: "440 Hz (Music Club)",
          category: "Live Rock & Fusion",
          time: "10:30 AM - 01:30 PM",
          venue: "Acoustic Amphitheater",
          bounty: "₹35,000",
          berries: "฿ 35,000,000",
          teamSize: "Band of 3-8",
          image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
          summary: "Live rock, metal, funk, and Indian classical fusion bands tear through amplifiers. High-gain distortion, thunderous drum solos, and vocal range.",
          rounds: [
            "Stage Set: 15-Minute Slot including line-check",
            "Requirements: Minimum 1 original composition mandatory"
          ],
          rules: [
            "Drum kit, bass rig, and PA provided; bring own guitars and pedals",
            "Backing tracks prohibited; 100% live audio execution"
          ],
          coordinator: "Neil D'Souza (+91 94567 89012)"
        },
        {
          id: "d3-e4",
          title: "Haute Couture: The Grand Runway",
          club: "Mosaic Arts Club",
          category: "Fashion & Theatrics",
          time: "05:00 PM - 07:00 PM",
          venue: "Grand Ramp Walkway (Main Stage)",
          bounty: "₹30,000",
          berries: "฿ 30,000,000",
          teamSize: "Team of 10-18",
          image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
          summary: "A high-fashion spectacle blending traditional Karnataka silk textiles, cyberpunk armor aesthetics, and avant-garde futuristic silhouettes.",
          rounds: [
            "Theme Showcase: 'Nautical Horizons & Cybernetic Silk'",
            "Model Poise & Best Designer Jury Round"
          ],
          rules: [
            "Time limit: 10 minutes runway presence per college",
            "Garments must reflect the declared cultural-futuristic theme"
          ],
          coordinator: "Meera Nair (+91 93451 09876)"
        },
        {
          id: "d3-e5",
          title: "Mosaic: Street Art & Live Graffiti",
          club: "Mosaic Arts Club",
          category: "Visual Arts",
          time: "10:00 AM - 03:00 PM",
          venue: "Central Campus Boulevard",
          bounty: "₹15,000",
          berries: "฿ 15,000,000",
          teamSize: "Solo or Duo",
          image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
          summary: "Transform colossal 8x6 ft canvases with aerosol spray, acrylics, and typography capturing the spirit of the 3 Islands of Avinya.",
          rounds: ["5-Hour Marathon Live Canvas Creation"],
          rules: ["Canvases and base priming provided", "Bring your own paints and brushes"],
          coordinator: "Karan Verma (+91 96541 23098)"
        },
        {
          id: "d3-e6",
          title: "Street Carnival Fair & Food Street",
          club: "Student Council Guild",
          category: "Carnival & Culinary",
          time: "All Day (10:00 AM - 10:00 PM)",
          venue: "Campus Ring Road Promenade",
          bounty: "Open Carnival",
          berries: "Festival Tokens",
          teamSize: "Open Access",
          image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
          summary: "Over 40 food stalls, dessert trucks, vintage arcade booths, shooting galleries, and local Dharwad sweets (Dharwad Peda showcase).",
          rounds: ["Continuous festival carnival access"],
          rules: ["Cashless digital UPI / Avinya tokens accepted"],
          coordinator: "Hospitality Lead (+91 836 225 7000)"
        },
        {
          id: "d3-e7",
          isSlot: true,
          title: "Open Cultural Protocol: Slot 07",
          club: "Reserved for Regional Arts Society",
          category: "Street Play / Nukkad Natak",
          time: "TBA - Morning Slot",
          venue: "Open Plaza Amphitheatre",
          bounty: "₹20,000 Bounty",
          berries: "฿ 20,000,000",
          teamSize: "Troupe of 10-20",
          image: "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=800&q=80",
          summary: "Social awareness, satire, and acoustic dholak rhythms addressing contemporary societal and technological dilemmas.",
          rounds: ["To be confirmed with dramatics council"],
          rules: ["Acoustic only; no microphones"],
          coordinator: "Dramatics Lead (+91 97891 02934)"
        },
        {
          id: "d3-e8",
          isSlot: true,
          title: "Grand Award Ceremony: Slot 08",
          club: "Avinya Core Committee & Director Office",
          category: "Felicitation & Valedictory",
          time: "06:30 PM - 07:30 PM",
          venue: "Main Auditorium Prime",
          bounty: "Trophies & National Certificates",
          berries: "All Champions",
          teamSize: "All Winners",
          image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80",
          summary: "Honoring the champions of Hack2Future, RoboWars, Competitive Programming, and Dance battles in the presence of Institute Dignitaries.",
          rounds: ["Official Institute Valedictory Session"],
          rules: ["Winners must be present in formal attire"],
          coordinator: "Directorate (+91 836 225 7000)"
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
    perks: [
      "₹1.5 Lakhs+ Cash Bounty Pool + Track Sponsor Bounties",
      "Direct Interview Fast-Tracks with Sponsor Deep-Tech Firms",
      "Complimentary Hacker Beds, Unlimited Snacks, Energy Drinks, & 3-Day Meals",
      "Official Swag Bags, Custom Hacker Hoodies & GitHub Stickers"
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
    },
    {
      q: "Can a team participate in multiple events across different days?",
      a: "Yes, as long as the event schedules do not overlap. The Master Schedule allows you to plan your itinerary without clash."
    }
  ]
};
