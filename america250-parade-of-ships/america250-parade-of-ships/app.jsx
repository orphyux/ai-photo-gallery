
const { useState, useMemo, useEffect } = React;

/* ---------- tiny inline icon set ---------- */
function Icon({ children, size = 18, className = "" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      {children}
    </svg>
  );
}
const MapPin = (p) => <Icon {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></Icon>;
const Camera = (p) => <Icon {...p}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z"/><circle cx="12" cy="13" r="3"/></Icon>;
const XIcon = (p) => <Icon {...p}><path d="M18 6 6 18M6 6l12 12"/></Icon>;
const ChevronLeft = (p) => <Icon {...p}><path d="m15 18-6-6 6-6"/></Icon>;
const ChevronRight = (p) => <Icon {...p}><path d="m9 18 6-6-6-6"/></Icon>;
const ChevronDown = (p) => <Icon {...p}><path d="m6 9 6 6 6-6"/></Icon>;
const LayoutGrid = (p) => <Icon {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></Icon>;
const Volume2 = (p) => <Icon {...p}><path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></Icon>;
const VolumeX = (p) => <Icon {...p}><path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="m23 9-6 6M17 9l6 6"/></Icon>;
const ScrollText = (p) => <Icon {...p}><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M15 8h-5M15 12h-5"/></Icon>;
const Sun = (p) => <Icon {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></Icon>;
const Users = (p) => <Icon {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></Icon>;
const Wrench = (p) => <Icon {...p}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></Icon>;

/* ---------- gallery data ---------- */
const GALLERY_DATA = [
  {
    "id": "IMG_01",
    "title": "USS Farragut Steams Up the Hudson",
    "category": "Warships",
    "desc": "The Arleigh Burke-class guided-missile destroyer USS Farragut (DDG-99), dressed in red-white-and-blue bunting, passes the Hudson Yards skyline with a harbor patrol boat running alongside.",
    "placard": null,
    "hotspots": [
      { id: "hull", top: "58%", left: "70%", title: "Hull Number 99", text: "USS Farragut is an Arleigh Burke-class guided-missile destroyer. Ships like her took part in the Seventh International Naval Review, held on the Hudson alongside the tall-ship parade, with more than fifty U.S. and foreign warships anchored or underway in the harbor." },
      { id: "bunting", top: "63%", left: "48%", title: "Dressed Overall", text: "The string of red-white-and-blue bunting along the destroyer's rails is a naval tradition called 'dressing ship' \u2014 flags and pennants run from bow to stern for holidays and ceremonial occasions like this one." },
      { id: "escort", top: "82%", left: "30%", title: "Harbor Escort", text: "A small law-enforcement patrol boat shadows the destroyer's bow. Every vessel in the parade moved up the Hudson inside a security screen of harbor patrol and Coast Guard boats." }
    ],
    "data": "images/america250-1.jpg"
  },
  {
    "id": "IMG_02",
    "title": "Blue Angels Over Hudson Yards",
    "category": "Aerial Review",
    "desc": "The U.S. Navy's Blue Angels hold a tight diamond formation above the glass towers of Hudson Yards, four white smoke trails cutting across a clear morning sky.",
    "placard": null,
    "hotspots": [
      { id: "diamond", top: "34%", left: "76%", title: "The Diamond", text: "Four jets flying the 'diamond' \u2014 the Blue Angels' signature formation \u2014 with as little as eighteen inches separating wingtips and canopies at closing speeds of several hundred miles an hour." }
    ],
    "data": "images/america250-2.jpg"
  },
  {
    "id": "IMG_03",
    "title": "Diamond Formation, Wide View",
    "category": "Aerial Review",
    "desc": "The same diamond formation banks past the Hudson Yards spire, with the Empire State Building visible in the haze to the right.",
    "placard": null,
    "hotspots": [],
    "data": "images/america250-3.jpg"
  },
  {
    "id": "IMG_04",
    "title": "Red, White, and Blue Overhead",
    "category": "Aerial Review",
    "desc": "An aerobatic display team streaks over Lower Manhattan, laying down red, white, and blue smoke that stretches the length of the Hudson waterfront.",
    "placard": null,
    "hotspots": [
      { id: "smoke", top: "55%", left: "60%", title: "Three-Color Smoke", text: "Display teams generate colored smoke by injecting dyed oil into the hot exhaust stream \u2014 a technique used by air demonstration squadrons worldwide to make a formation's track visible from the ground." }
    ],
    "data": "images/america250-4.jpg"
  },
  {
    "id": "IMG_05",
    "title": "Smoke Trail Toward One World Trade",
    "category": "Aerial Review",
    "desc": "The same formation banks lower, its colored smoke trailing directly toward the spire of One World Trade Center.",
    "placard": null,
    "hotspots": [],
    "data": "images/america250-5.jpg"
  },
  {
    "id": "IMG_06",
    "title": "\"FIFI\" the B-29 Superfortress",
    "category": "Aerial Review",
    "desc": "A World War II-era Boeing B-29 Superfortress named FIFI banks against a bank of clouds \u2014 one of the rarest aircraft still flying on the airshow circuit today.",
    "placard": null,
    "hotspots": [
      { id: "nose", top: "52%", left: "42%", title: "Named FIFI", text: "This B-29 was pulled from a U.S. Navy desert storage yard in 1971 and restored to flying condition. Operated today by the Commemorative Air Force, it is widely regarded as the only B-29 in the world still flying on a regular basis." },
      { id: "tail", top: "58%", left: "68%", title: "Tail Marking", text: "The black square with a white letter echoes the group-identification markings the U.S. Army Air Forces painted on B-29s serving in the Pacific during World War II." }
    ],
    "data": "images/america250-6.jpg"
  },
  {
    "id": "IMG_07",
    "title": "Marine Corps KC-130 Hercules Pair",
    "category": "Aerial Review",
    "desc": "Two U.S. Marine Corps KC-130 Hercules aerial refuelers cross paths overhead, four turboprop engines apiece throttled back for the low pass.",
    "placard": null,
    "hotspots": [
      { id: "marines", top: "45%", left: "30%", title: "Tanker and Transport", text: "The KC-130 is a dual-role aircraft: fitted with underwing refueling pods, it can top off Marine Corps helicopters and jets in flight, and can just as easily carry troops or cargo when the tanks come off." }
    ],
    "data": "images/america250-7.jpg"
  },
  {
    "id": "IMG_08",
    "title": "Fireboat Salute, Distant View",
    "category": "Fireboats & Harbor Vessels",
    "desc": "An FDNY fireboat throws high arcs of harbor water into the afternoon haze \u2014 the traditional salute given to visiting ships on the Hudson.",
    "placard": null,
    "hotspots": [],
    "data": "images/america250-8.jpg"
  },
  {
    "id": "IMG_09",
    "title": "Fireboat Three Forty Three and the Empire State Building",
    "category": "Fireboats & Harbor Vessels",
    "desc": "FDNY fireboat Three Forty Three fans a wall of water across the river with the Chrysler Building and the Empire State Building rising behind it.",
    "placard": null,
    "hotspots": [
      { id: "name", top: "80%", left: "55%", title: "A Fireboat's Salute", text: "Spraying water arcs is a ceremonial salute FDNY fireboats perform for parades, ship christenings, and visiting vessels \u2014 the harbor equivalent of a gun salute." },
      { id: "skyline", top: "20%", left: "45%", title: "Midtown Skyline", text: "From left to right the view reaches the Chrysler Building's spire and the Empire State Building's mast, both landmarks the fleet paraded past on its way up the Hudson." }
    ],
    "data": "images/america250-9.jpg"
  },
  {
    "id": "IMG_10",
    "title": "Three Forty Three, Closer Pass",
    "category": "Fireboats & Harbor Vessels",
    "desc": "The same FDNY fireboat cuts closer past the pier crowds, its twin plumes catching the late-afternoon light beneath the Empire State Building.",
    "placard": null,
    "hotspots": [
      { id: "crowd", top: "88%", left: "20%", title: "Waterfront Crowds", text: "Along the seawall at left, spectators lined the Manhattan waterfront for the length of the parade route \u2014 public viewing was free, with ticketed harbor cruises offered by private operators for a closer look." }
    ],
    "data": "images/america250-10.jpg"
  },
  {
    "id": "IMG_11",
    "title": "Oosterschelde Under Full Sail",
    "category": "Tall Ships",
    "desc": "The Dutch schooner Oosterschelde, a restored 1918 cargo vessel, glides past the glass towers of a Manhattan marina under a full spread of canvas.",
    "placard": null,
    "hotspots": [
      { id: "hull", top: "72%", left: "45%", title: "A Working Ship, Restored", text: "Built in 1918 as a cargo-carrying schooner, Oosterschelde is one of the last large Dutch sailing vessels still in original condition. She sails today as a registered Dutch national monument and regularly crosses oceans under her original rig." },
      { id: "flag", top: "15%", left: "72%", title: "Flying the Netherlands' Colors", text: "The red-white-blue flag at the masthead marks Oosterschelde as part of the Netherlands' contingent among the roughly four dozen tall ships from thirty nations that sailed up the Hudson that day." }
    ],
    "data": "images/america250-11.jpg"
  },
  {
    "id": "IMG_12",
    "title": "Air Force Tanker and Fighter Escort",
    "category": "Aerial Review",
    "desc": "A U.S. Air Force KC-135 Stratotanker holds center formation with four fighter jets, all four aircraft reduced to silhouettes against the afternoon sky.",
    "placard": null,
    "hotspots": [
      { id: "boom", top: "70%", left: "50%", title: "Refueling Boom", text: "The retractable boom visible beneath the tanker's tail is normally used to transfer fuel to aircraft in flight; here it's stowed for the formation flyover rather than in use." }
    ],
    "data": "images/america250-12.jpg"
  },
  {
    "id": "IMG_13",
    "title": "A Baltimore Schooner Under Sail",
    "category": "Tall Ships",
    "desc": "A black-hulled topsail schooner flying Maryland's flag beats past Midtown, rigged in the fast, raked-mast style associated with the 19th-century Baltimore clippers.",
    "placard": null,
    "hotspots": [
      { id: "flag", top: "22%", left: "55%", title: "Maryland's Colors", text: "The black-and-gold and red-and-white quartered flag is Maryland's state flag \u2014 flown here by one of the schooners carrying Baltimore's maritime heritage into the international fleet." }
    ],
    "data": "images/america250-13.jpg"
  },
  {
    "id": "IMG_14",
    "title": "Nine-Ship Smoke Formation",
    "category": "Aerial Review",
    "desc": "A nine-aircraft aerobatic team holds a wide echelon, each jet trailing its own red, white, or blue smoke line across the sky.",
    "placard": null,
    "hotspots": [],
    "data": "images/america250-14.jpg"
  },
  {
    "id": "IMG_15",
    "title": "Three Tall Ships Converge",
    "category": "Tall Ships",
    "desc": "A full-rigged training ship under square sails meets the Baltimore schooner and a distant topsail schooner as a fireboat sprays behind them and a gray-hulled Navy vessel waits at the pier on the right.",
    "placard": null,
    "hotspots": [
      { id: "square", top: "35%", left: "42%", title: "A Square-Rigged Training Ship", text: "The large white-hulled ship flying a full set of square sails and a large American flag is built and rigged in the style of a sail-training barque, of the kind navies use to teach cadets seamanship under sail \u2014 the largest and grandest vessels typically lead a tall-ship parade." },
      { id: "schooner", top: "55%", left: "75%", title: "The Baltimore Schooner Returns", text: "The black schooner at right is the same Maryland-flagged vessel seen earlier in the gallery, now converging with the larger ships near the pier." },
      { id: "carrier", top: "70%", left: "92%", title: "A Modern Warship in the Background", text: "Docked at the pier on the far right, a gray-hulled naval vessel offers a striking contrast \u2014 the age of sail and the modern fleet, sharing the same stretch of harbor on the same afternoon." }
    ],
    "data": "images/america250-15.jpg"
  },
];
const CATEGORIES = ["All", "Tall Ships", "Warships", "Aerial Review", "Fireboats & Harbor Vessels"];

function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const speak = (text) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.95;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utter);
  };
  const stop = () => { window.speechSynthesis.cancel(); setSpeaking(false); };
  useEffect(() => () => window.speechSynthesis.cancel(), []);
  return { speaking, speak, stop };
}

/* ---------- Intro / historical overview ----------
   TEMPLATE — replace everything below with the new gallery's own story.
   Keep the mechanism (collapsible section, narration button, hero image
   with overlay) — only the content (text, image paths, icons) is meant to
   change per gallery. Aim for 2-4 short story sections, each with its own
   supporting photo — see SKILL.md Phase 4 for how to source this content
   (real research for a place/institution; direct questions to the user for
   a personal collection/trip with no public source material). */
function Intro() {
  const [open, setOpen] = useState(true);
  const { speaking, speak, stop } = useSpeech();

  const introText =
    "America 250, Parade of Ships. On July 4th, 2026, New York Harbor hosted Sail4th 250, the maritime centerpiece of the United States' 250th birthday. Roughly four dozen tall ships from thirty nations sailed up the Hudson River from the Verrazzano Narrows Bridge to the George Washington Bridge, sharing the water with more than fifty U.S. and international warships taking part in the Seventh International Naval Review. Overhead, the Navy's Blue Angels led an aerial review of more than one hundred and twenty aircraft, from vintage World War Two warbirds to modern fighters and tankers. This gallery is a photographer's afternoon on the waterfront watching all three centuries of American seafaring and flight pass by at once.";

  const handleNarrate = () => {
    if (speaking) stop();
    else speak(introText);
  };

  return (
    <section className="border-b border-neutral-700">
      {/* Hero */}
      <div className="relative">
        <img
          src="images/america250-15.jpg"
          alt="Three tall ships converge on the Hudson River near a fireboat spraying water, with Manhattan in the background"
          className="w-full h-72 sm:h-96 object-cover"
        />
        <div className="hero-overlay absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="uppercase tracking-widest text-xs text-amber-300 font-semibold mb-2">
            Sail4th 250 · July 4, 2026
          </p>
          <h1 className="text-3xl sm:text-5xl font-serif text-white mb-3 drop-shadow">
            America 250 — Parade of Ships
          </h1>
          <p className="flex items-center justify-center gap-1.5 text-sm text-neutral-100">
            <MapPin size={14} /> New York Harbor &amp; the Hudson River
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-3 mb-6"
        >
          <h2 className="text-xl sm:text-2xl font-serif text-white text-left">
            What This Collection Is
          </h2>
          <ChevronDown
            size={20}
            className={"text-neutral-400 transition-transform " + (open ? "rotate-180" : "")}
          />
        </button>

        {open && (
          <div className="space-y-8">
            {/* Section 1 — the event itself */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <div className="sm:col-span-2 rounded-lg overflow-hidden border border-neutral-700">
                <img src="images/america250-11.jpg" alt="The Dutch schooner Oosterschelde under sail past the Manhattan skyline" className="w-full h-40 sm:h-full object-cover" />
              </div>
              <div className="sm:col-span-3">
                <h3 className="flex items-center gap-2 font-serif text-lg text-amber-300 mb-2">
                  <Sun size={16} /> A Harbor Full of History
                </h3>
                <p className="text-sm text-neutral-200 leading-relaxed">
                  Sail4th 250 ran from July 3rd through 8th, 2026, as the maritime
                  centerpiece of America's 250th anniversary. Its signature event, the
                  Parade of Sail, sent roughly four dozen tall ships — both towering
                  square-riggers and smaller schooners from about thirty nations —
                  up the Hudson from the Verrazzano-Narrows Bridge to the George
                  Washington Bridge at six-minute intervals, a procession that took
                  over two hours to pass any one point on the shore. It was consciously
                  built in the tradition of the 1976 Bicentennial and the 1986 Statue
                  of Liberty Centennial tall-ship parades before it.
                </p>
              </div>
            </div>

            {/* Section 2 — steel among the sails */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <div className="sm:col-span-2 rounded-lg overflow-hidden border border-neutral-700 sm:order-2">
                <img src="images/america250-1.jpg" alt="USS Farragut, a guided-missile destroyer, dressed in bunting on the Hudson River" className="w-full h-40 sm:h-full object-cover" />
              </div>
              <div className="sm:col-span-3 sm:order-1">
                <h3 className="flex items-center gap-2 font-serif text-lg text-amber-300 mb-2">
                  <Users size={16} /> Steel and Canvas Together
                </h3>
                <p className="text-sm text-neutral-200 leading-relaxed">
                  Wooden schooners and steel warships shared the same stretch of
                  river that day. The U.S. Navy hosted the Seventh International
                  Naval Review alongside the sail parade, drawing more than fifty
                  U.S. and foreign warships — from guided-missile destroyers like
                  USS Farragut to visiting international vessels — into the harbor
                  for ship tours and public viewing from July 5th through the 8th.
                </p>
              </div>
            </div>

            {/* Section 3 — the aerial review */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <div className="sm:col-span-2 rounded-lg overflow-hidden border border-neutral-700">
                <img src="images/america250-6.jpg" alt="A World War II-era B-29 Superfortress named FIFI banking against clouds" className="w-full h-40 sm:h-full object-cover" />
              </div>
              <div className="sm:col-span-3">
                <h3 className="flex items-center gap-2 font-serif text-lg text-amber-300 mb-2">
                  <Wrench size={16} /> The Aerial Review
                </h3>
                <p className="text-sm text-neutral-200 leading-relaxed">
                  Around 10:15 that morning, an International Aerial Review of more
                  than 120 aircraft crossed the harbor and the Hudson, led by the
                  U.S. Navy's Blue Angels in their F/A-18 Super Hornets. The flyover
                  mixed eras as freely as the ships below it did — a restored World
                  War II B-29 Superfortress and Marine Corps Hercules transports
                  shared the sky with modern fighters, tankers, and aerobatic display
                  teams trailing red, white, and blue smoke over Lower Manhattan.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleNarrate}
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-neutral-900 font-semibold text-sm px-4 py-2.5 rounded-full transition-colors shadow"
              >
                {speaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
                {speaking ? "Stop listening" : "Listen to the full story"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- Gallery ---------- */
function Gallery() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const { speaking, speak, stop } = useSpeech();

  const filtered = useMemo(
    () => (filter === "All" ? GALLERY_DATA : GALLERY_DATA.filter((p) => p.category === filter)),
    [filter]
  );

  const openAt = (idx) => { setSelected(idx); setActiveHotspot(null); };
  const close = () => { stop(); setSelected(null); setActiveHotspot(null); };
  const next = () => { stop(); setActiveHotspot(null); setSelected((i) => (i === null ? null : (i + 1) % filtered.length)); };
  const prev = () => { stop(); setActiveHotspot(null); setSelected((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length)); };

  const current = selected !== null ? filtered[selected] : null;
  const hotspots = current?.hotspots || [];
  const hotspotIndex = hotspots.findIndex((h) => h.id === activeHotspot);
  const currentHotspot = hotspotIndex >= 0 ? hotspots[hotspotIndex] : null;
  const placard = current?.placard || null;

  const goHotspot = (dir) => {
    if (hotspotIndex < 0 || hotspots.length === 0) return;
    const nextIdx = (hotspotIndex + dir + hotspots.length) % hotspots.length;
    setActiveHotspot(hotspots[nextIdx].id);
  };

  const handleNarrate = () => {
    if (!current) return;
    if (speaking) { stop(); return; }
    let text = `${current.title}. ${current.desc}`;
    if (placard) text += ` From the museum placard: ${placard.sign_title}. ${placard.body || ""}`;
    speak(text);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (selected === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, filtered.length]);

  return (
    <div className="min-h-screen w-full bg-neutral-900 text-white pb-16">
      <Intro />

      <p className="flex items-center justify-center gap-1.5 text-xs text-neutral-400 mt-8">
        <Camera size={12} /> Photographed from the Manhattan waterfront · {GALLERY_DATA.length} photos
      </p>

      {/* Filter pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 px-4 py-6">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`text-sm px-4 py-2 rounded-full border transition-colors font-medium ${
              filter === cat ? "bg-amber-400 border-amber-400 text-neutral-900"
              : "bg-neutral-800 border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-white"
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {filtered.length === 0 ? (
          <div className="text-center text-neutral-400 py-16 flex flex-col items-center gap-2">
            <LayoutGrid size={28} /> No photos in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((photo, idx) => (
              <button key={photo.id} onClick={() => openAt(idx)}
                className="group relative rounded-lg overflow-hidden bg-neutral-800 border border-neutral-700 hover:border-amber-400 transition-colors aspect-square">
                <img src={photo.data} alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                <div className="absolute top-1.5 left-1.5 right-1.5 flex justify-between">
                  {photo.placard && (
                    <span className="bg-emerald-500 text-neutral-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1">
                      <ScrollText size={10} /> placard
                    </span>
                  )}
                  {photo.hotspots && photo.hotspots.length > 0 && (
                    <span className="bg-amber-400 text-neutral-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-auto">
                      tap-to-explore
                    </span>
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-70 px-2 py-1.5">
                  <p className="text-xs font-medium text-white truncate text-left">{photo.title}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {current && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center p-4 sm:p-8 overflow-y-auto">
          <button onClick={close} className="fixed top-4 right-4 sm:top-6 sm:right-6 bg-neutral-800 hover:bg-neutral-700 rounded-full p-2 text-white z-10" aria-label="Close">
            <XIcon size={20} />
          </button>
          <button onClick={prev} className="fixed left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-neutral-800 hover:bg-neutral-700 rounded-full p-2 sm:p-3 text-white z-10" aria-label="Previous photo">
            <ChevronLeft size={22} />
          </button>
          <button onClick={next} className="fixed right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-neutral-800 hover:bg-neutral-700 rounded-full p-2 sm:p-3 text-white z-10" aria-label="Next photo">
            <ChevronRight size={22} />
          </button>

          <div className="max-w-3xl w-full flex flex-col items-center my-8">
            <div className="relative w-full flex justify-center">
              <div className="relative inline-block">
                <img src={current.data} alt={current.title} className="max-h-96 sm:max-h-[28rem] w-auto object-contain rounded-lg border border-neutral-700" />
                {hotspots.map((h) => (
                  <button key={h.id} onClick={() => setActiveHotspot(h.id)} className="absolute -translate-x-1/2 -translate-y-1/2 group" style={{ top: h.top, left: h.left }} aria-label={`Learn about ${h.title}`}>
                    <span className="absolute inset-0 rounded-full bg-amber-300 opacity-60 animate-ping" />
                    <span className="relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-400 border-2 border-white shadow-lg text-neutral-900 text-xs font-bold group-hover:scale-110 transition-transform">+</span>
                  </button>
                ))}
                {hotspots.length > 0 && !currentHotspot && (
                  <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-3 py-1.5 rounded-full">Tap the glowing dots to explore</div>
                )}
              </div>
            </div>

            {currentHotspot && (
              <div className="w-full max-w-xl bg-neutral-800 border border-neutral-700 rounded-xl p-4 sm:p-5 mt-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-serif text-lg text-white">{currentHotspot.title}</h3>
                  <button onClick={() => setActiveHotspot(null)} className="text-neutral-400 hover:text-white shrink-0" aria-label="Close detail"><XIcon size={18} /></button>
                </div>
                <p className="text-sm text-neutral-200 leading-relaxed mb-3">{currentHotspot.text}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400">{hotspotIndex + 1} of {hotspots.length}</span>
                  <div className="flex gap-2">
                    <button onClick={() => goHotspot(-1)} className="p-1.5 rounded-full bg-neutral-700 hover:bg-neutral-600 transition-colors" aria-label="Previous detail"><ChevronLeft size={16} /></button>
                    <button onClick={() => goHotspot(1)} className="p-1.5 rounded-full bg-neutral-700 hover:bg-neutral-600 transition-colors" aria-label="Next detail"><ChevronRight size={16} /></button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 text-center max-w-xl">
              <span className="inline-block text-xs uppercase tracking-widest text-amber-300 font-semibold mb-1">{current.category}</span>
              <h2 className="text-xl sm:text-2xl font-serif text-white mb-2">{current.title}</h2>
              <p className="text-sm text-neutral-300 leading-relaxed mb-4">{current.desc}</p>
              <button onClick={handleNarrate} className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-neutral-900 font-semibold text-sm px-4 py-2.5 rounded-full transition-colors shadow">
                {speaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
                {speaking ? "Stop listening" : "Listen to this photo"}
              </button>
            </div>

            {placard && (
              <div className="w-full max-w-xl bg-neutral-800 border-2 border-emerald-500 rounded-xl p-4 sm:p-5 mt-6 text-left">
                <div className="flex items-center gap-2 mb-3">
                  <ScrollText size={16} className="text-emerald-400" />
                  <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">From the Museum Placard</span>
                </div>
                <h3 className="font-serif text-lg text-white mb-2">{placard.sign_title}</h3>
                {placard.lines && placard.lines.length > 0 && (
                  <ul className="text-sm text-neutral-200 space-y-1 mb-3">
                    {placard.lines.map((line, i) => (<li key={i} className="flex gap-2"><span className="text-emerald-400">•</span><span>{line}</span></li>))}
                  </ul>
                )}
                {placard.body && (<p className="text-sm text-neutral-300 leading-relaxed italic">{placard.body}</p>)}
                {placard.note && (<p className="text-sm text-amber-200 leading-relaxed mt-3">{placard.note}</p>)}
                {placard.partial && (<p className="text-xs text-neutral-500 mt-3">(Part of this sign was too small or blurred to read with full confidence — shown here is what could be verified.)</p>)}
              </div>
            )}

            <p className="text-xs text-neutral-500 mt-6">{selected + 1} of {filtered.length}</p>
          </div>
        </div>
      )}

      <footer className="text-center text-xs text-neutral-500 mt-12 px-4">
        Photographed on the Hudson River waterfront, New York City · July 4, 2026 ·{" "}
        <a href="https://sail4th.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-300">
          Sail4th 250
        </a>
      </footer>
    </div>
  );
}

try {
  ReactDOM.createRoot(document.getElementById("root")).render(<Gallery />);
  window.__appMounted = true;
} catch (err) {
  window.__appMounted = true; // stop the generic fallback from also firing
  document.getElementById("root").innerHTML =
    '<div style="font-family: -apple-system, sans-serif; background:#171717; color:#fff; min-height:100vh; display:flex; align-items:center; justify-content:center; text-align:center; padding:2rem;">' +
    '<div style="max-width:32rem;"><h1 style="font-size:1.25rem; margin-bottom:1rem;">Something went wrong loading the page</h1>' +
    '<p style="color:#fca5a5; font-size:0.85rem; word-break:break-word;">' + String(err && err.message ? err.message : err) + '</p></div></div>';
}
