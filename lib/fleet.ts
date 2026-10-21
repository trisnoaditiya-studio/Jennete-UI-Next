/* Katalog armada (sama dengan rent.jennete.com). Dipakai listing, beranda, mega menu, dan form. */
export type Jenis = "mobil" | "motor";
export type Unit = {
  id: string;
  brand: string;
  name: string;
  jenis: Jenis;
  kategori: string;
  premium: boolean;
  bb: string; // Listrik | PHEV | Bensin | "" (belum diketahui)
  desc: string;
  price: number | null; // null = sesuai penawaran
  unit: "hari" | "minggu";
  img: string | null;
  icon: "mpv" | "suv" | "city" | "sedan" | "moto";
  url: string | null; // halaman detail, bila ada
};

export const UNITS: Unit[] = [
  {"id": "cortez", "brand": "Wuling", "name": "Cortez Darion", "jenis": "mobil", "kategori": "MPV", "premium": false, "bb": "Listrik", "desc": "MPV keluarga dan operasional, 7 kursi, otomatis", "price": 1500000, "unit": "hari", "img": "/assets/img/fleet/1.jpg", "icon": "mpv", "url": "/wuling-cortez-darion/"},
  {"id": "tiggo8", "brand": "Chery", "name": "Tiggo 8 CSH", "jenis": "mobil", "kategori": "SUV", "premium": false, "bb": "PHEV", "desc": "SUV 7 kursi, 1.500 cc PHEV, otomatis", "price": 1500000, "unit": "hari", "img": "/assets/img/fleet/2.jpg", "icon": "suv", "url": null},
  {"id": "sealion", "brand": "BYD", "name": "Sealion 7", "jenis": "mobil", "kategori": "SUV", "premium": false, "bb": "Listrik", "desc": "SUV premium, 5 kursi, baterai 82,5 kWh", "price": 2500000, "unit": "hari", "img": "/assets/img/fleet/3.jpg", "icon": "suv", "url": null},
  {"id": "jetour", "brand": "Jetour", "name": "T2", "jenis": "mobil", "kategori": "SUV", "premium": false, "bb": "Bensin", "desc": "SUV 5 kursi, 2.000 cc turbo, otomatis XWD", "price": 1750000, "unit": "hari", "img": "/assets/img/fleet/4.jpg", "icon": "suv", "url": null},
  {"id": "j5", "brand": "Jaecoo", "name": "J5 EV", "jenis": "mobil", "kategori": "SUV", "premium": false, "bb": "Listrik", "desc": "SUV kompak, 5 kursi, baterai 60,9 kWh", "price": 1250000, "unit": "hari", "img": "/assets/img/fleet/5.jpg", "icon": "suv", "url": null},
  {"id": "j6", "brand": "Chery", "name": "J6 iWD", "jenis": "mobil", "kategori": "SUV", "premium": false, "bb": "Listrik", "desc": "SUV 5 kursi, baterai 82,5 kWh, otomatis", "price": 1750000, "unit": "hari", "img": "/assets/img/fleet/6.jpg", "icon": "suv", "url": null},
  {"id": "atto", "brand": "BYD", "name": "Atto 1", "jenis": "mobil", "kategori": "City Car", "premium": false, "bb": "Listrik", "desc": "City car 5 kursi, baterai 33,8 kWh", "price": 950000, "unit": "hari", "img": "/assets/img/fleet/7.jpg", "icon": "city", "url": null},
  {"id": "aira", "brand": "Wuling", "name": "AIRA EV", "jenis": "mobil", "kategori": "City Car", "premium": false, "bb": "Listrik", "desc": "City car 5 kursi, listrik 30 kW", "price": 750000, "unit": "hari", "img": "/assets/img/fleet/8.jpg", "icon": "city", "url": null},
  {"id": "city", "brand": "Honda", "name": "City", "jenis": "mobil", "kategori": "City Car", "premium": false, "bb": "", "desc": "Sedan kompak untuk mobilitas perkotaan", "price": null, "unit": "hari", "img": "/assets/img/fleet/x-hondacity.jpg", "icon": "sedan", "url": null},
  {"id": "alphard", "brand": "Toyota", "name": "Alphard", "jenis": "mobil", "kategori": "MPV", "premium": true, "bb": "", "desc": "MPV premium untuk direksi dan tamu VIP", "price": null, "unit": "hari", "img": "/assets/img/fleet/x-alphard.jpg", "icon": "mpv", "url": null},
  {"id": "voxy", "brand": "Toyota", "name": "Voxy", "jenis": "mobil", "kategori": "MPV", "premium": true, "bb": "", "desc": "MPV 7 kursi untuk keluarga dan operasional", "price": null, "unit": "hari", "img": "/assets/img/fleet/x-voxy.jpg", "icon": "mpv", "url": null},
  {"id": "odyssey", "brand": "Honda", "name": "Odyssey", "jenis": "mobil", "kategori": "MPV", "premium": true, "bb": "", "desc": "MPV nyaman untuk perjalanan jauh", "price": null, "unit": "hari", "img": "/assets/img/fleet/x-odyssey.jpg", "icon": "mpv", "url": null},
  {"id": "camry", "brand": "Toyota", "name": "Camry", "jenis": "mobil", "kategori": "Sedan", "premium": true, "bb": "", "desc": "Sedan premium untuk jajaran manajemen", "price": null, "unit": "hari", "img": null, "icon": "sedan", "url": null},
  {"id": "accord", "brand": "Honda", "name": "Accord", "jenis": "mobil", "kategori": "Sedan", "premium": true, "bb": "", "desc": "Sedan premium untuk jajaran manajemen", "price": null, "unit": "hari", "img": null, "icon": "sedan", "url": null},
  {"id": "palisade", "brand": "Hyundai", "name": "Palisade", "jenis": "mobil", "kategori": "SUV", "premium": true, "bb": "", "desc": "SUV premium untuk direksi dan tamu", "price": null, "unit": "hari", "img": null, "icon": "suv", "url": null},
  {"id": "aerox", "brand": "Yamaha", "name": "Aerox 155 VVA", "jenis": "motor", "kategori": "Matic", "premium": false, "bb": "Bensin", "desc": "Matic sport, 155 cc, otomatis", "price": 750000, "unit": "minggu", "img": "/assets/img/fleet/m-aerox.jpg", "icon": "moto", "url": null},
  {"id": "nex", "brand": "Suzuki", "name": "NEX II 115 Fi", "jenis": "motor", "kategori": "Matic", "premium": false, "bb": "Bensin", "desc": "Matic harian, 115 cc, otomatis", "price": 500000, "unit": "minggu", "img": "/assets/img/fleet/m-suzuki-next.jpg", "icon": "moto", "url": null},
  {"id": "fino", "brand": "Yamaha", "name": "Fino 125", "jenis": "motor", "kategori": "Matic", "premium": false, "bb": "Bensin", "desc": "Matic klasik, 125 cc, otomatis", "price": 500000, "unit": "minggu", "img": "/assets/img/fleet/m-fino.jpg", "icon": "moto", "url": null},
  {"id": "xride", "brand": "Yamaha", "name": "X-Ride 125", "jenis": "motor", "kategori": "Matic", "premium": false, "bb": "Bensin", "desc": "Matic adventure, 125 cc, otomatis", "price": 500000, "unit": "minggu", "img": "/assets/img/fleet/m-xride.jpg", "icon": "moto", "url": null},
  {"id": "jmx", "brand": "Yamaha", "name": "Jupiter MX 150", "jenis": "motor", "kategori": "Bebek", "premium": false, "bb": "Bensin", "desc": "Bebek, 150 cc, manual", "price": 475000, "unit": "minggu", "img": "/assets/img/fleet/m-jupitermx.jpg", "icon": "moto", "url": null},
  {"id": "jz1", "brand": "Yamaha", "name": "Jupiter Z1 CW 115", "jenis": "motor", "kategori": "Bebek", "premium": false, "bb": "Bensin", "desc": "Bebek, 115 cc, manual", "price": 450000, "unit": "minggu", "img": "/assets/img/fleet/m-jupiter.jpg", "icon": "moto", "url": null},
  {"id": "vega", "brand": "Yamaha", "name": "Vega Force 115 CW", "jenis": "motor", "kategori": "Bebek", "premium": false, "bb": "Bensin", "desc": "Bebek, 115 cc, manual", "price": 350000, "unit": "minggu", "img": "/assets/img/fleet/m-vega.jpg", "icon": "moto", "url": null},
];

export const mobil = UNITS.filter((u) => u.jenis === "mobil");
export const motor = UNITS.filter((u) => u.jenis === "motor");
export const premium = mobil.filter((u) => u.premium);
export const listrik = mobil.filter((u) => u.bb === "Listrik" || u.bb === "PHEV");

export const fullName = (u: Pick<Unit, "brand" | "name">) => `${u.brand} ${u.name}`;
export const unitSlug = (u: Pick<Unit, "brand" | "name">) =>
  fullName(u).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/* katalog merek → model untuk pilihan di form (termasuk unit di slide beranda) */
export const EXTRA_CATALOG: Pick<Unit, "brand" | "name" | "jenis">[] = [{ brand: "Lexus", name: "LM 350h", jenis: "mobil" }];
export function catalog(jenis: Jenis): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  [...UNITS, ...EXTRA_CATALOG].filter((u) => u.jenis === jenis).forEach((u) => {
    const list = (out[u.brand] ||= []);
    if (!list.includes(u.name)) list.push(u.name);
  });
  return out;
}
