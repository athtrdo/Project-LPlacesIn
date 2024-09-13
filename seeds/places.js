const mongoose = require("mongoose");
const Place = require("../models/place");
const hereMaps = require('../utils/hereMaps')
const mongodb_URI = "mongodb+srv://ajitrih7:athtrdo7@cluster7.h15lb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster7";

// const { geometry } = require("../utils/hereMaps");

mongoose
  .connect(mongodb_URI)
  .then((result) => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

async function seedPlaces() {
  const places = [
    {
      title: "Taman Mini Indonesia Indah",
      price: 35000,
      description:
        "Taman hiburan keluarga dengan berbagai replika bangunan dari seluruh Indonesia",
      location: "Taman Mini Indonesia Indah, Jakarta",
      images:[
        {
          url:'public\\images\\TMII\\Taman_Mini_Indonesia_Indah_TMII_Berubah_Jadi_Tempat_Wisata_yang.jpg',
          filename:'TMII\\Taman_Mini_Indonesia_Indah_TMII_Berubah_Jadi_Tempat_Wisata_yang.jpg'
        },
        {
          url:'public\\images\\TMII\\Taman Mini Indonesia Indah Ticket.jpg',
          filename:'TMII\\Taman Mini Indonesia Indah Ticket.jpg'
        },
        {
          url:'public\\images\\TMII\\TamanMiniIndonesiaIndahTicket(TMII).jpg',
          filename:'TMII\\TamanMiniIndonesiaIndahTicket(TMII).jpg'
        }
      ],
    },
    {
      title: "Pantai Kuta",
      price: 0,
      description:
        "Pantai yang terkenal di Bali dengan pemandangan sunset yang indah",
      location: "Pantai Kuta, Kuta, Badung Regency, Bali",
      images: [
        {
          url:'public\\images\\Kuta\\1.jpg',
          filename:'Kuta\\1.jpg'
        },
        {
          url:'public\\images\\Kuta\\2.jpg',
          filename:'Kuta\\2.jpg'
        },
        {
          url:'public\\images\\Kuta\\3.jpg',
          filename:'Kuta\\3.jpg'
        }
      ],
    },
    {
      title: "Borobudur",
      price: 50000,
      description:
        "Candi Buddha terbesar di dunia yang terletak di Magelang, Jawa Tengah",
      location: "Borobudur, Magelang, Central Java",
      images: [
        {
          url:'public\\images\\Borobudur\\1.jpg',
          filename:'Borobudur\\1.jpg'
        },
        {
          url:'public\\images\\Borobudur\\2.jpg',
          filename:'Borobudur\\2.jpg'
        },
        {
          url:'public\\images\\Borobudur\\3.jpg',
          filename:'Borobudur\\3.jpg'
        }
      ],
    },
    {
      title: "Malioboro",
      price: 0,
      description:
        "Jalan utama di Yogyakarta dengan berbagai toko dan kuliner khas",
      location: "Jl. Malioboro, Yogyakarta City, Special Region of Yogyakarta",
      images: [
        {
          url:'public\\images\\Malioboro\\1.png',
          filename:'Malioboro\\1.png'
        },
        {
          url:'public\\images\\Malioboro\\2.jpg',
          filename:'Malioboro\\2.jpg'
        },
        {
          url:'public\\images\\Malioboro\\3.jpg',
          filename:'Malioboro\\3.jpg'
        }
      ],
    },
    {
      title: "Umbul Ponggok",
      price: 15000,
      description:
        "Umbul Ponggok merupakan wisata air yang terletak di desa Ponggok, Klaten, Jawa Tengah. Umbul Ponggok merupakan mata air yang dimanfaatkan menjadi objek wisata, pemandian dan selam permukaan.",
      location: "Ponggok, Kec. Polanharjo, Kabupaten Klaten, Jawa Tengah",
      images:[
        {
          url:'public\\images\\ponggok\\umbul-ponggok-768x432.webp',
          filename:'ponggok\\umbul-ponggok-768x432.webp'
        },
        {
          url:'public\\images\\ponggok\\114913.jpg',
          filename:'ponggok\\114913.jpg'
        },
        {
          url:'public\\images\\ponggok\\7-2836927734.jpg',
          filename:'ponggok\\7-2836927734.jpg'
        }
      ],
    },
    {
      title: "Candi Prambanan",
      price: 50000,
      description:
        "Candi Hindu terbesar di Indonesia yang terletak di Yogyakarta",
      location: "Candi Prambanan, Sleman, Special Region of Yogyakarta",
      images: [
        {
          url:'public\\images\\Prambanan\\1.jpg',
          filename:'Prambanan\\1.jpg'
        },
        {
          url:'public\\images\\Prambanan\\2.png',
          filename:'Prambanan\\2.png'
        },
        {
          url:'public\\images\\Prambanan\\3.jpg',
          filename:'Prambanan\\3.jpg'
        }
      ],
    },
    {
      title: "Danau Toba",
      price: 1000000,
      description:
        "Danau vulkanik terbesar di Indonesia yang terletak di Sumatera Utara untuk biaya masuk termasuk dengan sewa kapal",
      location: "Danau Toba, North Sumatra",
      images: [
        {
          url:'public\\images\\Toba\\1.jpg',
          filename:'Toba\\1.jpg'
        },
        {
          url:'public\\images\\Toba\\2.jpg',
          filename:'Toba\\2.jpg'
        },
        {
          url:'public\\images\\Toba\\3.jpg',
          filename:'Toba\\3.jpg'
        }
      ],
    },
    {
      title: "Kawah Ijen",
      price: 10000,
      description:
        "Kawah vulkanik dengan fenomena blue fire di Banyuwangi, Jawa Timur",
      location: "Kawah Ijen, Banyuwangi, East Java",
      images: [
        {
          url:'public\\images\\Borobudur\\1.jpg',
          filename:'Borobudur\\1.jpg'
        },
        {
          url:'public\\images\\Borobudur\\2.jpg',
          filename:'Borobudur\\2.jpg'
        },
        {
          url:'public\\images\\Borobudur\\3.jpeg',
          filename:'Borobudur\\3.jpeg'
        }
      ],
    },
    {
      title: "Pulau Komodo",
      price: 320000,
      description:
        "Pulau di Indonesia yang terkenal dengan komodo, hewan terbesar di dunia",
      location: "Pulau Komodo, East Nusa Tenggara",
      images: [
        {
          url:'public\\images\\komodo\\1.jpg',
          filename:'komodo\\1.jpg'
        },
        {
          url:'public\\images\\komodo\\2.jpg',
          filename:'komodo\\2.jpg'
        },
        {
          url:'public\\images\\komodo\\3.jpg',
          filename:'komodo\\3.jpg'
        }
      ],
    },
    {
      title: "Taman Nasional Gunung Rinjani",
      price: 150000,
      description:
        "Taman nasional yang terletak di Lombok dan memiliki gunung tertinggi kedua di Indonesia",
      location: "Taman Nasional Gunung Rinjani, Lombok, West Nusa Tenggara",
      images: [
        {
          url:'public\\images\\rinjani\\1.jpg',
          filename:'rinjani\\1.jpg'
        },
        {
          url:'public\\images\\rinjani\\2.jpeg',
          filename:'rinjani\\2.jpeg'
        },
        {
          url:'public\\images\\rinjani\\3.jpg',
          filename:'rinjani\\3.jpg'
        }
      ],
    },
    {
      title: "Pulau Weh",
      price: 125000,
      description:
        "Pulau yang terletak di ujung barat Indonesia dengan keindahan bawah laut yang luar biasa",
      location: "Pulau Weh, Sabang, Aceh",
      images: [
        {
          url:'public\\images\\weh\\1.jpg',
          filename:'weh\\1.jpg'
        },
        {
          url:'public\\images\\weh\\2.jpg',
          filename:'weh\\2.jpg'
        },
        {
          url:'public\\images\\weh\\3.jpg',
          filename:'weh\\3.jpg'
        }
      ],
    },
    {
      title: "Pulau Lombok",
      price: 3000000,
      description:
        "Pulau di Indonesia yang terkenal dengan keindahan pantainya",
      location: "Pulau Lombok, West Nusa Tenggara",
      images: [
        {
          url:'public\\images\\lombok\\1.jpg',
          filename:'lombok\\1.jpg'
        },
        {
          url:'public\\images\\lombok\\2.webp',
          filename:'lombok\\2.webp'
        },
        {
          url:'public\\images\\lombok\\3.jpg',
          filename:'lombok\\3.jpg'
        }
      ],
    },
    
  ];

  
    const newPlace = await Promise.all( places.map(async(place) => {
      let geoData = await hereMaps.geoJSON(place.location);
      if(!geoData){
        geoData = { type: 'Point', coordinates: [116.32883, -8.90952] }
      }
      return {
        ...place,author: '66e3cc95ef1c040fb6c184ad',
      geoJSON: {...geoData}
    }
    }))

  try{
    await Place.insertMany(newPlace);
    console.log("Data saved!");
  } catch (error) {
    console.log("Error, can't save data", error);
  } finally {
    mongoose.disconnect();
  }

  //   try {
  //     const newPlace = await Promise.all(
  //       places.map(async (place) => {
  //         let geoData = await geometry(place.location);
  //         if (!geoData) {
  //           geoData = { type: "Point", coordinates: [116.32883, -8.90952] };
  //         }
  //         return {
  //           ...place,
  //           author: "643d0c066dd99b1f6d6d6ad3",
  //           images: {
  //             url: "public\\images\\image-1681876521153-260851838.jpg",
  //             filename: "image-1681876521153-260851838.jpg",
  //           },
  //           geometry: geoData,
  //         };
  //       })
  //     );

  //     await Place.deleteMany({});
  //     await Place.insertMany(newPlace);
  //     console.log("Data saved");
  //   } catch (err) {
  //     console.log("Can't save data have error", err);
  //   } finally {
  //     mongoose.disconnect();
  //   }
}

seedPlaces();
