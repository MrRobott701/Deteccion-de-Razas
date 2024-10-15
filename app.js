async function loadModel() {
    // Cargar el modelo desde el directorio generado por tensorflowjs_converter
    console.log("Cargando modelo...");
    const model = await tf.loadLayersModel('./assets/modelo/model.json');
    console.log("Modelo cargado.");
    return model;
}

async function preprocessImage(image) {
    const tfImage = tf.browser.fromPixels(image).resizeNearestNeighbor([224, 224]).toFloat();
    const meanImageNetRGB = tf.tensor1d([123.68, 116.779, 103.939]);
    return tfImage.sub(meanImageNetRGB).div(tf.scalar(255));
}

reader.readAsDataURL(file);

async function predict() {
    const model = await loadModel();
    const imageUpload = document.getElementById('archivoInput');
    const predictionResult = document.getElementById('resultado');

    const file = imageUpload.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async function (e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = async function () {
                const preprocessedImage = await preprocessImage(img);
                const input = preprocessedImage.reshape([1, 224, 224, 3]);

                const predictions = model.predict(input);
                const predictedClass = predictions.argMax(1).dataSync()[0];

                // Agregar un condicional para mostrar mensajes personalizados
                let mensaje = "";
                let descripcion = "";
                if (predictedClass < 80) {
                    mensaje = "La clase predicha es menor a 80, es mejor de 80.";
                } else if (predictedClass > 80) {
                    mensaje = "La clase predicha es mayor a 80, es mayor.";
                } else {
                    mensaje = "La clase predicha no es menor ni mayor a 80, vale verga.";
                }
                switch (true) {
                    case (predictedClass == 0):
                        mensaje = "Chihuahua";
                        descripcion = "El Chihuahua es la raza de perro más pequeña del mundo, originaria de México. Con un peso que generalmente varía entre 1.5 y 3 kilogramos, estos perros tienen una esperanza de vida de 12 a 20 años. Su pelaje puede ser corto o largo y viene en una variedad de colores. Los Chihuahuas son conocidos por ser valientes, leales y a menudo tienen una personalidad vivaz. Debido a su pequeño tamaño, son ideales para la vida en apartamentos y requieren cuidados específicos, incluido el control de la temperatura debido a su sensibilidad al frío. Además, necesitan socialización y entrenamiento temprano para desarrollar una actitud equilibrada.";

                        break;
                    case (predictedClass == 1):
                        mensaje = "Japanese Spaniel";
                        descripcion = "El Japanese Spaniel, también conocido como Chin, es una raza de perro originaria de Japón. Este pequeño perro de compañía tiene una expresión facial distintiva con una cara plana y ojos grandes. Su pelaje es sedoso y puede ser de varios colores. Los Japanese Spaniels son conocidos por su naturaleza amigable y afectuosa. Aunque son de tamaño pequeño, son robustos y pueden adaptarse bien a la vida en interiores. Su esperanza de vida es de aproximadamente 10 a 12 años.";

                        break;
                    case (predictedClass == 2):
                        mensaje = "Maltese Dog";
                        descripcion = "El Maltese Dog, originario de Malta, es una raza de perro pequeña y juguetona. Con un pelaje largo y sedoso de color blanco, estos perros son conocidos por su apariencia elegante. Tienen una esperanza de vida de 12 a 15 años. A pesar de su tamaño, son perros valientes y llenos de energía. Los Maltese Dogs son compañeros leales y requieren cuidado especial del pelaje para mantener su apariencia distintiva.";

                        break;
                    case (predictedClass == 3):
                        mensaje = "Pekinese";
                        descripcion = "El Pekinés es una antigua raza de perro que se originó en China. Con una apariencia distintiva de cara plana y ojos grandes, estos perros tienen un pelaje largo y denso. Su esperanza de vida es de 12 a 14 años. Aunque son pequeños, los Pekineses son conocidos por su actitud independiente y a menudo se muestran reservados con extraños. Requieren cuidados regulares del pelaje y aprecian la compañía de sus dueños.";

                        break;
                    case (predictedClass == 4):
                        mensaje = "Shih Tzu";
                        descripcion = "El Shih Tzu es una raza de perro de compañía originaria de China. Con un pelaje largo y denso, estos perros tienen una expresión amigable y distintiva. Tienen una esperanza de vida de 10 a 18 años. Los Shih Tzus son conocidos por ser cariñosos, amigables y adaptables a diversos entornos. Requieren cuidados regulares del pelaje y disfrutan de la interacción social.";

                        break;
                    case (predictedClass == 5):
                        mensaje = "Blenheim Spaniel";
                        descripcion = "El Blenheim Spaniel es una variante del Cavalier King Charles Spaniel, originario del Reino Unido. Con un pelaje sedoso y suave de color castaño y blanco, estos perros tienen una esperanza de vida de 9 a 14 años. Son conocidos por ser afectuosos, amigables y buenos con los niños. Los Blenheim Spaniels son compañeros leales y disfrutan de la compañía humana. Requieren cuidado regular del pelaje y actividad física para mantener su salud y bienestar.";

                        break;
                    case (predictedClass == 6):
                        mensaje = "Papillon";
                        descripcion = "El Papillon es una raza de perro pequeña y elegante, originaria de Europa. Con orejas grandes y erguidas que se asemejan a mariposas, estos perros tienen un pelaje largo y sedoso. Su esperanza de vida es de aproximadamente 12 a 16 años. Los Papillones son conocidos por ser inteligentes, enérgicos y afectuosos. A pesar de su tamaño, son perros activos que disfrutan del ejercicio y la interacción social.";

                        break;
                    case (predictedClass == 7):
                        mensaje = "Toy Terrier";
                        descripcion = "El Toy Terrier es una raza de perro pequeña que se destaca por su agilidad y actitud vivaz. Originario de Inglaterra, estos perros tienen una esperanza de vida de 10 a 13 años. Son conocidos por ser leales, valientes y a menudo tienen una personalidad extrovertida. Los Toy Terriers requieren cuidados regulares y disfrutan de actividades que estimulen su mente.";

                        break;
                    case (predictedClass == 8):
                        mensaje = "Rhodesian Ridgeback";
                        descripcion = "El Rhodesian Ridgeback es una raza de perro grande y atlética, originaria de África. Con un distintivo 'ridge' en su espalda, estos perros tienen un pelaje corto y denso. Su esperanza de vida es de 10 a 12 años. Los Rhodesian Ridgebacks son conocidos por ser valientes, leales y buenos con las familias. Requieren ejercicio regular y una socialización temprana para desarrollar un comportamiento equilibrado.";

                        break;
                    case (predictedClass == 9):
                        mensaje = "Afghan Hound";
                        descripcion = "El Afghan Hound es una raza de perro elegante y de aspecto noble, originaria de Afganistán. Con un pelaje largo y sedoso, estos perros tienen una esperanza de vida de 12 a 14 años. Son conocidos por su gracia y velocidad, así como por su personalidad independiente. Los Afghan Hounds requieren cuidados especiales del pelaje y actividades que estimulen su mente.";

                        break;
                    case (predictedClass == 10):
                        mensaje = "Basset";
                        descripcion = "El Basset Hound es una raza de perro de tamaño mediano con orejas largas y un olfato excepcional. Originario de Francia, estos perros tienen un pelaje corto y denso. Su esperanza de vida es de 10 a 12 años. Los Basset Hounds son conocidos por ser amigables, gentiles y a menudo tranquilos. Requieren cuidados regulares, especialmente en sus orejas, y disfrutan de actividades que involucren su olfato.";

                        break;
                    case (predictedClass == 11):
                        mensaje = "Beagle";
                        descripcion = "El Beagle es una raza de perro pequeña y activa, originaria de Inglaterra. Con orejas largas y expresivos ojos, estos perros tienen un pelaje corto y resistente. Su esperanza de vida es de 12 a 15 años. Los Beagles son conocidos por su naturaleza amigable, curiosa y enérgica. Requieren ejercicio regular y estimulación mental para mantenerse felices y saludables.";

                        break;
                    case (predictedClass == 12):
                        mensaje = "Bloodhound";
                        descripcion = "El Bloodhound es una raza de perro grande y poderosa, conocida por su olfato extraordinario. Originario de Bélgica, estos perros tienen un pelaje corto y arrugado. Su esperanza de vida es de 10 a 12 años. Los Bloodhounds son conocidos por ser amigables, gentiles y a menudo relajados. Requieren cuidados regulares, especialmente en sus orejas, y disfrutan de actividades que involucren su sentido del olfato.";

                        break;
                    case (predictedClass == 13):
                        mensaje = "Bluetick";
                        descripcion = "El Bluetick Coonhound es una raza de perro de caza originaria de Estados Unidos. Con un pelaje corto y moteado de color azul, estos perros tienen una esperanza de vida de 11 a 12 años. Son conocidos por su valentía, lealtad y habilidades de rastreo. Los Bluetick Coonhounds requieren ejercicio regular y son ideales para familias activas.";

                        break;
                    case (predictedClass == 14):
                        mensaje = "Black-and-tan Coonhound";
                        descripcion = "El Black-and-tan Coonhound es una raza de perro de caza con un pelaje corto y brillante de color negro y bronceado. Originario de Estados Unidos, estos perros tienen una esperanza de vida de 10 a 12 años. Son conocidos por su valentía, resistencia y habilidades de rastreo. Los Black-and-tan Coonhounds requieren ejercicio regular y son compañeros leales.";

                        break;
                    case (predictedClass == 15):
                        mensaje = "Walker Hound";
                        descripcion = "El Walker Coonhound es una variante del Coonhound conocida por su velocidad y agilidad en la caza. Originario de Estados Unidos, estos perros tienen un pelaje corto y brillante. Su esperanza de vida es de 10 a 12 años. Los Walker Coonhounds son conocidos por ser enérgicos, leales y buenos con las familias. Requieren ejercicio regular y actividades que estimulen su mente.";

                        break;
                    case (predictedClass == 16):
                        mensaje = "English Foxhound";
                        descripcion = "El English Foxhound es una raza de perro de caza originaria de Inglaterra. Con un pelaje corto y denso, estos perros tienen una esperanza de vida de 10 a 13 años. Son conocidos por su resistencia, valentía y habilidades de rastreo. Los English Foxhounds requieren ejercicio regular y son ideales para entornos activos.";

                        break;
                    case (predictedClass == 17):
                        mensaje = "Redbone";
                        descripcion = "El Redbone Coonhound es una raza de perro de caza conocida por su pelaje rojo brillante y su destreza en la caza. Originario de Estados Unidos, estos perros tienen un pelaje corto y suave. Su esperanza de vida es de 11 a 12 años. Los Redbone Coonhounds son conocidos por ser amigables, enérgicos y buenos con las familias. Requieren ejercicio regular y estimulación mental.";

                        break;
                    case (predictedClass == 18):
                        mensaje = "Borzoi";
                        descripcion = "El Borzoi, también conocido como Galgo Ruso, es una raza de perro elegante y de gran tamaño, originaria de Rusia. Con un pelaje largo y sedoso, estos perros tienen una esperanza de vida de 9 a 14 años. Son conocidos por su gracia, velocidad y naturaleza independiente. Los Borzois requieren cuidados regulares y disfrutan de espacios abiertos para correr.";

                        break;
                    case (predictedClass == 19):
                        mensaje = "Irish Wolfhound";
                        descripcion = "El Irish Wolfhound es una raza de perro gigante y poderosa, originaria de Irlanda. Con un pelaje áspero y resistente, estos perros tienen una esperanza de vida de 6 a 8 años. Son conocidos por ser gentiles, leales y buenos con las familias. Los Irish Wolfhounds requieren cuidados regulares y son ideales para hogares con mucho espacio.";

                        break;
                    case (predictedClass == 20):
                        mensaje = "Italian Greyhound";
                        descripcion = "El Italian Greyhound es una raza de perro pequeña y elegante, conocida por su velocidad y gracia. Originario de Italia, estos perros tienen un pelaje corto y fino. Su esperanza de vida es de 12 a 15 años. Son conocidos por ser cariñosos, juguetones y buenos compañeros. Los Italian Greyhounds requieren ejercicio regular y son ideales para hogares tranquilos.";

                        break;
                    case (predictedClass == 21):
                        mensaje = "Whippet";
                        descripcion = "El Whippet es una raza de perro pequeña y ágil, conocida por su velocidad en carreras. Originario de Inglaterra, estos perros tienen un pelaje corto y fino. Su esperanza de vida es de 12 a 15 años. Los Whippets son conocidos por ser amigables, tranquilos y buenos con las familias. Requieren ejercicio regular y son ideales para hogares activos.";

                        break;
                    case (predictedClass == 22):
                        mensaje = "Ibizan Hound";
                        descripcion = "El Ibizan Hound es una raza de perro elegante y atlética, originaria de España. Con un pelaje corto y fino, estos perros tienen una esperanza de vida de 10 a 14 años. Son conocidos por su agilidad, velocidad y naturaleza independiente. Los Ibizan Hounds requieren ejercicio regular y son ideales para hogares con espacio al aire libre.";

                        break;
                    case (predictedClass == 23):
                        mensaje = "Norwegian Elkhound";
                        descripcion = "El Norwegian Elkhound es una raza de perro de caza originaria de Noruega. Con un pelaje denso y gris, estos perros tienen una esperanza de vida de 12 a 15 años. Son conocidos por su valentía, lealtad y habilidades de rastreo. Los Norwegian Elkhounds requieren ejercicio regular y disfrutan de la interacción social.";

                        break;
                    case (predictedClass == 24):
                        mensaje = "Otterhound";
                        descripcion = "El Otterhound es una raza de perro de caza con un pelaje áspero y resistente. Originario de Inglaterra, estos perros tienen una esperanza de vida de 10 a 12 años. Son conocidos por su valentía, resistencia y habilidades en el agua. Los Otterhounds requieren cuidados regulares y disfrutan de actividades al aire libre.";

                        break;
                    case (predictedClass == 25):
                        mensaje = "Saluki";
                        descripcion = "El Saluki es una antigua raza de perro de caza, conocida por su gracia y velocidad. Originario de Oriente Medio, estos perros tienen un pelaje corto y suave. Su esperanza de vida es de 12 a 14 años. Los Salukis son conocidos por ser cariñosos, independientes y buenos con las familias. Requieren cuidados regulares y disfrutan de la actividad física.";

                        break;
                    case (predictedClass == 26):
                        mensaje = "Scottish Deerhound";
                        descripcion = "El Scottish Deerhound es una raza de perro gigante, originaria de Escocia. Con un pelaje áspero y resistente, estos perros tienen una esperanza de vida de 8 a 11 años. Son conocidos por su gentileza, lealtad y habilidades de caza. Los Scottish Deerhounds requieren cuidados regulares y son ideales para hogares con mucho espacio.";

                        break;
                    case (predictedClass == 27):
                        mensaje = "Weimaraner";
                        descripcion = "El Weimaraner es una raza de perro de caza y compañía, originaria de Alemania. Con un pelaje corto y gris plateado, estos perros tienen una esperanza de vida de 10 a 13 años. Son conocidos por su elegancia, velocidad y naturaleza leal. Los Weimaraners requieren ejercicio regular y son ideales para familias activas. Además, son conocidos por su inteligencia y capacidad de aprendizaje.";

                        break;
                    case (predictedClass == 28):
                        mensaje = "Staffordshire Bullterrier";
                        descripcion = "El Staffordshire Bullterrier es una raza de perro fuerte y musculoso, originaria de Inglaterra. Con un pelaje corto y variados colores, estos perros tienen una esperanza de vida de 12 a 14 años. Son conocidos por ser valientes, leales y amigables. Los Staffordshire Bullterriers son perros enérgicos que requieren ejercicio regular y socialización temprana para desarrollar una actitud equilibrada.";

                        break;
                    case (predictedClass == 29):
                        mensaje = "American Staffordshire Terrier";
                        descripcion = "El American Staffordshire Terrier es una raza de perro fuerte y atlético, originaria de Estados Unidos. Con un pelaje corto y variados colores, estos perros tienen una esperanza de vida de 12 a 16 años. Son conocidos por ser leales, valientes y afectuosos. Los American Staffordshire Terriers requieren ejercicio regular y socialización temprana para desarrollar un comportamiento positivo.";

                        break;
                    case (predictedClass == 30):
                        mensaje = "Bedlington Terrier";
                        descripcion = "El Bedlington Terrier es una raza de perro elegante y con forma de linterna, originaria del Reino Unido. Con un pelaje lanoso y rizado de color blanco, estos perros tienen una esperanza de vida de 12 a 16 años. Son conocidos por su personalidad afectuosa, valentía y agilidad. Los Bedlington Terriers requieren cuidados regulares del pelaje y ejercicio para mantenerse saludables y felices.";

                        break;
                    case (predictedClass == 31):
                        mensaje = "Border Terrier";
                        descripcion = "El Border Terrier es una raza de perro de trabajo, originaria del Reino Unido. Con un pelaje áspero y denso, estos perros tienen una esperanza de vida de 12 a 15 años. Son conocidos por ser amigables, alertas y enérgicos. Los Border Terriers requieren ejercicio regular y disfrutan de actividades que estimulen su mente.";

                        break;
                    case (predictedClass == 32):
                        mensaje = "Kerry Blue Terrier";
                        descripcion = "El Kerry Blue Terrier es una raza de perro de tamaño mediano, originaria de Irlanda. Con un pelaje denso y rizado de color azul, estos perros tienen una esperanza de vida de 12 a 15 años. Son conocidos por ser leales, valientes y activos. Los Kerry Blue Terriers requieren cuidados regulares del pelaje y ejercicio para mantenerse saludables.";

                        break;
                    case (predictedClass == 33):
                        mensaje = "Irish Terrier";
                        descripcion = "El Irish Terrier es una raza de perro terrier, originaria de Irlanda. Con un pelaje áspero y de color rojo, estos perros tienen una esperanza de vida de 12 a 16 años. Son conocidos por ser valientes, leales y amigables. Los Irish Terriers requieren cuidados regulares del pelaje y ejercicio para mantenerse en buena forma física.";

                        break;
                    case (predictedClass == 34):
                        mensaje = "Norfolk Terrier";
                        descripcion = "El Norfolk Terrier es una raza de perro pequeña y activa, originaria del Reino Unido. Con un pelaje denso y recto, estos perros tienen una esperanza de vida de 12 a 15 años. Son conocidos por ser amigables, alertas y enérgicos. Los Norfolk Terriers requieren ejercicio regular y disfrutan de la interacción social.";

                        break;
                    case (predictedClass == 35):
                        mensaje = "Norwich Terrier";
                        descripcion = "El Norwich Terrier es una raza de perro pequeña y robusta, originaria del Reino Unido. Con un pelaje denso y recto, estos perros tienen una esperanza de vida de 12 a 16 años. Son conocidos por ser valientes, alertas y afectuosos. Los Norwich Terriers requieren ejercicio regular y socialización temprana.";

                        break;
                    case (predictedClass == 36):
                        mensaje = "Yorkshire Terrier";
                        descripcion = "El Yorkshire Terrier es una raza de perro pequeña y elegante, originaria del Reino Unido. Con un pelaje largo y sedoso de color azul y fuego, estos perros tienen una esperanza de vida de 12 a 16 años. Son conocidos por su personalidad animada, valentía y lealtad. Los Yorkshire Terriers requieren cuidados regulares del pelaje y disfrutan de la interacción social.";

                        break;
                    case (predictedClass == 37):
                        mensaje = "Wire-haired Fox Terrier";
                        descripcion = "El Wire-haired Fox Terrier es una raza de perro terrier con un pelaje áspero y recto. Originario del Reino Unido, estos perros tienen una esperanza de vida de 12 a 15 años. Son conocidos por su valentía, energía y alerta. Los Wire-haired Fox Terriers requieren cuidados regulares del pelaje y ejercicio para mantenerse en buena forma física.";

                        break;
                    case (predictedClass == 38):
                        mensaje = "Lakeland Terrier";
                        descripcion = "El Lakeland Terrier es una raza de perro terrier, originaria del Reino Unido. Con un pelaje denso y recto, estos perros tienen una esperanza de vida de 12 a 15 años. Son conocidos por ser valientes, amigables y activos. Los Lakeland Terriers requieren cuidados regulares del pelaje y ejercicio para mantenerse en buena salud.";

                        break;
                    case (predictedClass == 39):
                        mensaje = "Sealyham Terrier";
                        descripcion = "El Sealyham Terrier es una raza de perro terrier, originaria de Gales. Con un pelaje denso y recto, estos perros tienen una esperanza de vida de 12 a 15 años. Son conocidos por ser valientes, leales y afectuosos. Los Sealyham Terriers requieren cuidados regulares del pelaje y ejercicio para mantenerse saludables y felices.";

                        break;
                    case (predictedClass == 40):
                        mensaje = "Airedale";
                        descripcion = "El Airedale Terrier, también conocido como 'Rey de los Terriers', es una raza de perro terrier de gran tamaño, originaria del Reino Unido. Con un pelaje áspero y denso, estos perros tienen una esperanza de vida de 10 a 13 años. Son conocidos por ser valientes, leales y amigables. Los Airedale Terriers requieren cuidados regulares del pelaje y ejercicio para mantenerse en buena forma física.";

                        break;
                    case (predictedClass == 41):
                        mensaje = "Cairn";
                        descripcion = "El Cairn Terrier es una raza de perro terrier, originaria del Reino Unido. Con un pelaje áspero y denso, estos perros tienen una esperanza de vida de 12 a 15 años. Son conocidos por ser valientes, enérgicos y amigables. Los Cairn Terriers requieren cuidados regulares del pelaje y ejercicio para mantenerse en buena forma física.";

                        break;
                    case (predictedClass == 42):
                        mensaje = "Australian Terrier";
                        descripcion = "El Australian Terrier es una raza de perro terrier, originaria de Australia. Con un pelaje áspero y denso, estos perros tienen una esperanza de vida de 12 a 15 años. Son conocidos por ser valientes, leales y afectuosos. Los Australian Terriers requieren cuidados regulares del pelaje y ejercicio para mantenerse en buena salud.";

                        break;
                    case (predictedClass == 43):
                        mensaje = "Dandie Dinmont";
                        descripcion = "El Dandie Dinmont Terrier es una raza de perro terrier, originaria del Reino Unido. Con un pelaje largo y sedoso, estos perros tienen una esperanza de vida de 12 a 15 años. Son conocidos por ser valientes, amigables y afectuosos. Los Dandie Dinmont Terriers requieren cuidados regulares del pelaje y ejercicio para mantenerse en buena forma física.";

                        break;
                    case (predictedClass == 44):
                        mensaje = "Boston Bull";
                        descripcion = "El Boston Terrier, también conocido como 'American Gentleman', es una raza de perro compacta y musculosa, originaria de Estados Unidos. Con un pelaje corto y variados colores, estos perros tienen una esperanza de vida de 11 a 13 años. Son conocidos por ser amigables, alertas y afectuosos. Los Boston Terriers requieren ejercicio regular y son ideales para hogares con espacio limitado.";

                        break;
                    case (predictedClass == 45):
                        mensaje = "Miniature Schnauzer";
                        descripcion = "El Miniature Schnauzer es una raza de perro schnauzer en miniatura, originaria de Alemania. Con un pelaje áspero y denso, estos perros tienen una esperanza de vida de 12 a 15 años. Son conocidos por ser valientes, leales y amigables. Los Miniature Schnauzers requieren cuidados regulares del pelaje y ejercicio para mantenerse en buena forma física.";

                        break;
                    case (predictedClass == 46):
                        mensaje = "Giant Schnauzer";
                        descripcion = "El Giant Schnauzer es una raza de perro schnauzer de gran tamaño, originaria de Alemania. Con un pelaje áspero y denso, estos perros tienen una esperanza de vida de 10 a 12 años. Son conocidos por ser valientes, leales y protectores. Los Giant Schnauzers requieren cuidados regulares del pelaje y ejercicio para mantenerse en buena forma física.";

                        break;
                    case (predictedClass == 47):
                        mensaje = "Standard Schnauzer";
                        descripcion = "El Standard Schnauzer es una raza de perro schnauzer de tamaño mediano, originaria de Alemania. Con un pelaje áspero y denso, estos perros tienen una esperanza de vida de 13 a 16 años. Son conocidos por ser valientes, leales y alertas. Los Standard Schnauzers requieren cuidados regulares del pelaje y ejercicio para mantenerse en buena forma física.";

                        break;
                    case (predictedClass == 48):
                        mensaje = "Scotch Terrier";
                        descripcion = "El Scotch Terrier, también conocido como Scottish Terrier o 'Scottie', es una raza de perro terrier, originaria de Escocia. Con un pelaje áspero y denso, estos perros tienen una esperanza de vida de 11 a 13 años. Son conocidos por ser valientes, leales y dignos. Los Scotch Terriers requieren cuidados regulares del pelaje y ejercicio para mantenerse en buena forma física.";

                        break;
                    case (predictedClass == 49):
                        mensaje = "Tibetan Terrier";
                        descripcion = "El Tibetan Terrier es una raza de perro terrier, originaria del Tíbet. Con un pelaje largo y denso, estos perros tienen una esperanza de vida de 12 a 15 años. Son conocidos por ser valientes, leales y afectuosos. Los Tibetan Terriers requieren cuidados regulares del pelaje y ejercicio para mantenerse en buena forma física.";

                        break;
                    case (predictedClass == 57):
                        mensaje = "Labrador Retriever";
                        descripcion = "El Labrador Retriever es una raza de perro originaria de Terranova, Canadá. Conocidos por su amabilidad y naturaleza juguetona, los Labradores tienen un pelaje corto y denso en colores como negro, chocolate o amarillo. Su esperanza de vida es de 10 a 14 años. Los Labradores son conocidos por ser leales, inteligentes y buenos compañeros familiares. Son perros versátiles y se destacan en diversas actividades, desde la caza hasta el trabajo como perros guía.";

                        break;
                    case (predictedClass == 58):
                        mensaje = "Chesapeake Bay Retriever";
                        descripcion = "El Chesapeake Bay Retriever es una raza de perro de trabajo originaria de Estados Unidos. Con un pelaje denso y resistente al agua, estos perros tienen una esperanza de vida de 10 a 13 años. Son conocidos por ser leales, inteligentes y excelentes nadadores. Los Chesapeake Bay Retrievers son perros de trabajo dedicados y se destacan en actividades acuáticas.";
                        break;
                    case (predictedClass == 59):
                        mensaje = "German Short-haired Pointer";
                        descripcion = "El Pointer Alemán de Pelo Corto, originario de Alemania, es un perro enérgico y amigable con una esperanza de vida de 10 a 14 años. Su pelaje corto y denso exhibe colores como blanco y negro, blanco y marrón, o tricolor. Con ojos generalmente marrones oscuros, estos perros son conocidos por su inteligencia y obediencia, siendo excelentes compañeros para personas activas y familias. Aunque poseen una personalidad amistosa, requieren ejercicio regular. En cuanto a su salud, pueden ser propensos a problemas como displasia de cadera, enfermedades oculares y del oído, subrayando la importancia de cuidados veterinarios consistentes y atención a sus necesidades específicas.";
                        break;
                    case (predictedClass == 60):
                        mensaje = "Vizsla";
                        descripcion = "El Vizsla es una raza de perro originaria de Hungría. Este canino de apariencia elegante y atlética tiene un pelaje corto y denso de color dorado-arena. Sus ojos, de tono avellana o marrón, resaltan su expresión amigable y alerta. Con una edad promedio de vida de 10 a 14 años, el Vizsla es conocido por ser un perro cariñoso, leal y altamente enérgico. Su personalidad equilibrada lo convierte en un excelente compañero para familias activas. Dada su naturaleza activa, el Vizsla requiere ejercicio regular y estimulación mental. En términos de salud, esta raza puede ser propensa a problemas como displasia de cadera y ciertos trastornos oculares, por lo que un cuidado veterinario adecuado es esencial para garantizar su bienestar a lo largo de su vida.";
                        break;
                    case (predictedClass == 61):
                        mensaje = "English Setter";
                        descripcion = "El English Setter es una distinguida raza de perro que tiene su origen en Inglaterra. Conocido por su apariencia elegante, este perro de tamaño mediano a grande tiene un pelaje sedoso y liso con plumaje en las orejas, pecho, vientre y patas. El pelaje puede tener varios colores, como azul belton, naranja belton, liver belton o tricolor. Con ojos expresivos y una mirada gentil, el English Setter tiene una personalidad amigable y extrovertida. A menudo se describen como afectuosos, inteligentes y buenos con las familias. También son conocidos por su resistencia y son excelentes compañeros para actividades al aire libre. La esperanza de vida promedio del English Setter es de alrededor de 10 a 12 años. Aunque generalmente son saludables, pueden ser propensos a ciertas condiciones como displasia de cadera, infecciones en el oído y atrofia progresiva de la retina. Chequeos veterinarios regulares, un adecuado cuidado del pelaje y una dieta equilibrada contribuyen a mantener la salud y el bienestar del English Setter.";
                        break;
                    case (predictedClass == 62):
                        mensaje = "Irish Setter";
                        descripcion = "El Irish Setter es una raza de perro que se originó en Irlanda. Conocido por su hermoso pelaje rojo brillante y su apariencia atlética, el Irish Setter es un perro de tamaño mediano a grande. Su pelaje es largo, suave y sedoso, y su expresión es amigable con ojos de color avellana o marrón. Estos perros tienen una personalidad activa, amigable y juguetona. Son conocidos por ser afectuosos, inteligentes y buenos con las familias. La esperanza de vida típica de un Irish Setter es de alrededor de 10 a 14 años. ";
                        break;
                    case (predictedClass == 63):
                        mensaje = "Gordon Setter";
                        descripcion = "El Gordon Setter es una raza de perro que se originó en Escocia. Es conocido por su pelaje largo y sedoso, generalmente de color negro y fuego, con marcas distintivas en el pecho, la garganta, las patas y la cara. Esta raza de tamaño mediano a grande tiene una apariencia elegante y una expresión alerta con ojos oscuros y orejas caídas. La esperanza de vida típica de un Gordon Setter suele ser de alrededor de 10 a 12 años.";
                        break;
                    case (predictedClass == 64):
                        mensaje = "Brittany Spaniel";
                        descripcion = "El Brittany Spaniel, comúnmente conocido simplemente como Brittany, es una raza de perro que se origina en Francia, a pesar de que el término fue eliminado de su nombre oficial en 1982. Es un perro de tamaño mediano con una apariencia atlética y musculosa. El pelaje es corto, denso y puede presentarse en varios colores, como blanco y naranja, blanco y negro, o tricolor. Estos perros son conocidos por su energía, inteligencia y disposición amigable. Son perros activos y juguetones, lo que los convierte en compañeros ideales para personas con un estilo de vida activo. Además, los Brittanys son fácilmente entrenables y suelen llevarse bien con niños y otras mascotas. En términos de salud, la esperanza de vida típica de un Brittany Spaniel es de alrededor de 12 a 14 años.";
                        break;
                    case (predictedClass == 65):
                        mensaje = "Clumber";
                        descripcion = "El Clumber Spaniel es un perro de origen británico, conocido por su tamaño grande, pelaje blanco y marcas de limón o naranja. Aunque robusto, tiene una naturaleza tranquila y es leal y afectuoso con la familia. Con una esperanza de vida de 10 a 12 años, esta raza puede ser propensa a problemas como displasia de cadera y problemas oculares, por lo que requiere cuidados veterinarios regulares, ejercicio y una dieta controlada.";
                        break;
                    case (predictedClass == 66):
                        mensaje = "English Springer";
                        descripcion = "El English Springer Spaniel es una raza de perro que se originó en Inglaterra. Es conocido por su tamaño mediano, ojos expresivos y pelaje moderadamente largo y denso, que puede ser de varios colores, incluyendo negro y blanco, hígado y blanco, o tricolor. Estos perros son activos, amigables y poseen una naturaleza inteligente y leal. Son conocidos por ser excelentes compañeros familiares debido a su afectuosidad y disposición juguetona. La esperanza de vida típica de un English Springer Spaniel es de alrededor de 12 a 14 años. Aunque generalmente saludables, pueden ser propensos a problemas como displasia de cadera y enfermedades oculares, por lo que el cuidado veterinario regular, ejercicio y una dieta equilibrada son esenciales para mantener su bienestar general.";
                        break;
                    case (predictedClass == 67):
                        mensaje = "Welsh Springer Spaniel";
                        descripcion = "El Welsh Springer Spaniel es una raza de perro originaria de Gales, conocida por su pelaje suave y sedoso de color rojo y blanco. Son perros de tamaño mediano, enérgicos y leales, ideales para familias. Con una esperanza de vida de 12 a 15 años, requieren cuidado veterinario regular, ejercicio y una dieta equilibrada para mantener su salud y vitalidad.";
                        break;
                    case (predictedClass == 68):
                        mensaje = "Cocker Spaniel";
                        descripcion = "El Cocker Spaniel es una encantadora raza de perro conocida por su tamaño mediano, orejas largas y expresión dulce. Su pelaje puede ser largo y sedoso, generalmente en una variedad de colores. Estos perros son amigables, juguetones y bien adaptados a la convivencia familiar. Requieren cuidado regular de su pelaje y ejercicio moderado para mantenerse saludables y felices. Con una esperanza de vida típica de 12 a 15 años, los Cockers pueden enfrentar problemas de salud como otitis y cataratas, por lo que exámenes veterinarios regulares son esenciales.";
                        break;
                    case (predictedClass == 69):
                        mensaje = "Sussex Spaniel";
                        descripcion = "El Sussex Spaniel es una raza de perro originaria de Inglaterra, reconocida por su pelaje ondulado y su color dorado rojizo. De tamaño mediano, estos perros son conocidos por su disposición amigable y afectuosa. Aunque son menos activos en comparación con otros Spaniels, requieren ejercicio regular para mantenerse saludables. Con una esperanza de vida de alrededor de 10 a 12 años, los Sussex Spaniels pueden enfrentar problemas de salud como la displasia de cadera y la obesidad, por lo que es importante un cuidado veterinario regular y una dieta equilibrada.";
                        break;
                    case (predictedClass == 70):
                        mensaje = "Irish Water Spaniel";
                        descripcion = "El Irish Water Spaniel es una raza de perro originaria de Irlanda, caracterizada por su distintivo pelaje rizado y su cola en forma de látigo. De tamaño mediano a grande, estos perros son conocidos por su inteligencia, energía y amor por el agua. Son excelentes nadadores y disfrutan de actividades acuáticas. Aunque son amigables y leales, pueden ser reservados con extraños. Con una esperanza de vida de alrededor de 10 a 13 años, los Irish Water Spaniels pueden enfrentar problemas de salud como displasia de cadera y enfermedades oculares, por lo que el cuidado veterinario regular y la atención a su actividad física son esenciales para su bienestar general.";
                        break;
                    case (predictedClass == 71):
                        mensaje = "Kuvasz";
                        descripcion = "El Kuvasz es una raza de perro originaria de Hungría, reconocida por su imponente presencia y pelaje blanco y tupido. De tamaño grande, estos perros son conocidos por ser leales, protectores y afectuosos con sus familias. Son guardianes naturales y poseen una inteligencia destacada. Requieren socialización temprana y entrenamiento consistente debido a su naturaleza independiente. Con una esperanza de vida de alrededor de 10 a 12 años, los Kuvasz pueden enfrentar problemas de salud como displasia de cadera, por lo que cuidados veterinarios regulares y una dieta equilibrada son fundamentales para su bienestar general.";
                        break;
                    case (predictedClass == 72):
                        mensaje = "Schipperke";
                        descripcion = "El Schipperke es una raza de perro pequeña pero robusta originaria de Bélgica, reconocida por su pelaje negro, orejas puntiagudas y cola corta. Con una apariencia única y expresión alerta, estos perros son conocidos por ser enérgicos, curiosos y leales. A pesar de su tamaño, son valientes y buenos guardianes. Requieren ejercicio regular y estimulación mental para mantenerse felices. Con una esperanza de vida de aproximadamente 13 a 15 años, los Schipperkes pueden enfrentar problemas de salud como displasia de cadera y enfermedades oculares, destacando la importancia de chequeos veterinarios regulares y cuidado adecuado.";
                        break;
                    case (predictedClass == 73):
                        mensaje = "Groenendael";
                        descripcion = "El Groenendael es una variedad de perro pastor belga conocida por su elegancia y pelaje largo y negro. Originario de Bélgica, este perro es inteligente, leal y activo. Se destaca en actividades como el pastoreo y el adiestramiento, gracias a su naturaleza alerta y su disposición trabajadora. Los Groenendael son perros de tamaño mediano a grande que requieren ejercicio regular y estimulación mental. Con una esperanza de vida de alrededor de 10 a 14 años, es esencial proporcionarles atención veterinaria regular y una dieta equilibrada para mantener su bienestar general.";
                        break;
                    case (predictedClass == 74):
                        mensaje = "Malinois";
                        descripcion = "El Malinois, parte de las variedades de perros pastores belgas, es conocido por su inteligencia, energía y habilidades en el trabajo. Con un pelaje corto y denso de color marrón a canela, estos perros son ágiles y alerta. Destacan en tareas como el pastoreo y el trabajo policial debido a su agudo sentido del olfato y su capacidad de aprendizaje rápido. Requieren ejercicio regular y estimulación mental. Si bien son leales y protectores, el Malinois necesita una socialización temprana y un entrenamiento consistente. Con una esperanza de vida de alrededor de 12 a 14 años, cuidados veterinarios regulares y una dieta adecuada son esenciales para su bienestar general.";
                        break;
                    case (predictedClass == 75):
                        mensaje = "Briard";
                        descripcion = "El Briard es una raza de perro originaria de Francia, conocida por su pelaje largo y ondulado, especialmente en la cabeza. Estos perros son leales, afectuosos y valientes, siendo buenos guardianes y compañeros familiares. Su inteligencia destaca en diversas actividades, y se destacan en tareas de pastoreo. Los Briards requieren ejercicio regular y atención a su pelaje para mantener su salud y apariencia. Con una esperanza de vida de alrededor de 10 a 12 años, es importante proporcionarles cuidados veterinarios regulares y una dieta equilibrada para asegurar su bienestar general.";
                        break;
                    case (predictedClass == 76):
                        mensaje = "Kelpie";
                        descripcion = "El Kelpie Australiano, también conocido como Kelpie, es una raza de perro originaria de Australia, reconocida por su inteligencia y habilidades en la pastoreo. Con un pelaje corto y resistente, estos perros son ágiles y poseen una gran energía. Son leales, trabajadores y excelentes compañeros para actividades al aire libre. Requieren ejercicio regular y estimulación mental para mantenerse felices. Con una esperanza de vida de alrededor de 10 a 14 años, es esencial proporcionarles cuidados veterinarios regulares y una dieta adecuada para garantizar su bienestar general.";
                        break;
                    case (predictedClass == 77):
                        mensaje = "Komondor";
                        descripcion = "El Komondor es una raza de perro de origen húngaro conocida por su distintivo pelaje largo y cordado, que forma rastas naturales. Estos perros grandes y poderosos son leales, protectores y poseen una naturaleza tranquila. Tradicionalmente utilizados como perros guardianes de ganado, los Komondor requieren socialización temprana y entrenamiento consistente. A pesar de su apariencia imponente, son afectuosos con sus familias. Con una esperanza de vida de alrededor de 10 a 12 años, los cuidados regulares del pelaje y chequeos veterinarios son esenciales para mantener su salud y bienestar general.";
                        break;
                    case (predictedClass == 78):
                        mensaje = "Old English Sheepdog";
                        descripcion = "El Old English Sheepdog es una raza de perro originaria de Inglaterra, reconocida por su pelaje largo y lanudo, que cubre por completo sus ojos y cuerpo. Estos perros son conocidos por ser cariñosos, inteligentes y juguetones, siendo excelentes compañeros familiares. Aunque su pelaje requiere cuidado regular, su disposición amigable y leal compensa el esfuerzo de mantenimiento. Con una esperanza de vida de alrededor de 10 a 12 años, los Old English Sheepdogs pueden enfrentar problemas de salud como displasia de cadera y enfermedades oculares, por lo que cuidados veterinarios regulares son esenciales para su bienestar general.";
                        break;
                    case (predictedClass == 79):
                        mensaje = "Shetland Sheepdog";
                        descripcion = "El Shetland Sheepdog, también conocido como Sheltie, es una encantadora raza de perro originaria de las Islas Shetland, en Escocia. Reconocido por su pelaje espeso y su mirada alerta, el Sheltie es inteligente, leal y enérgico. Aunque es más pequeño que su pariente el Collie, comparte su disposición amigable y aptitudes de pastoreo. Estos perros son excelentes compañeros familiares y se destacan en actividades de agilidad y obediencia. Con una esperanza de vida de alrededor de 12 a 14 años, los Shetland Sheepdogs requieren cuidados regulares del pelaje y atención veterinaria para mantener su vitalidad y bienestar general.";
                        break;
                    case (predictedClass == 80):
                        mensaje = "Collie";
                        descripcion = "El Collie es una raza de perro originaria de Escocia, conocida por su elegancia y su pelaje largo y sedoso. Estos perros son leales, amigables e inteligentes, lo que los convierte en excelentes compañeros familiares. Aunque destacan en el pastoreo, también se desempeñan bien en actividades de obediencia y agilidad. Con una esperanza de vida de alrededor de 10 a 14 años, los Collies pueden enfrentar problemas de salud como displasia de cadera y problemas oculares, por lo que cuidados veterinarios regulares y atención adecuada al pelaje son esenciales para mantener su bienestar general.";
                        break;
                    case (predictedClass == 81):
                        mensaje = "Border Collie";
                        descripcion = "El Border Collie es una raza de perro originaria de la frontera entre Escocia e Inglaterra, conocida por su inteligencia excepcional y habilidades de pastoreo. Estos perros son energéticos, ágiles y poseen una gran capacidad de aprendizaje. Además de su destreza en el trabajo con el ganado, los Border Collies son compañeros leales y afectuosos. Requieren ejercicio regular y estimulación mental para mantenerse felices. Con una esperanza de vida de alrededor de 12 a 15 años, es esencial proporcionarles cuidados veterinarios regulares y una dieta balanceada para asegurar su bienestar general.";
                        break;
                    case (predictedClass == 82):
                        mensaje = "Bouvier des Flandres";
                        descripcion = "El Bouvier des Flandres es una raza de perro originaria de Bélgica y Francia, conocida por su apariencia robusta y su pelaje áspero y denso. Estos perros son leales, valientes y trabajadores, tradicionalmente utilizados como perros de pastoreo y guardianes de ganado. Aunque pueden ser reservados con extraños, son afectuosos con sus familias. Requieren ejercicio regular y entrenamiento consistente debido a su inteligencia y energía. Con una esperanza de vida de alrededor de 10 a 12 años, los Bouviers pueden enfrentar problemas de salud como displasia de cadera y enfermedades oculares, por lo que cuidados veterinarios regulares son esenciales para su bienestar general.";
                        break;
                    case (predictedClass == 83):
                        mensaje = "Rottweiler";
                        descripcion = "El Rottweiler es una raza de perro robusta y poderosa originaria de Alemania. Con un pelaje corto y denso, son conocidos por su apariencia musculosa y su lealtad a la familia. Aunque suelen tener una reputación de ser perros guardianes, los Rottweilers también pueden ser afectuosos y juguetones con una socialización adecuada. Requieren ejercicio regular y entrenamiento temprano debido a su inteligencia y energía. Con una esperanza de vida de alrededor de 9 a 12 años, los Rottweilers pueden enfrentar problemas de salud como displasia de cadera y problemas cardíacos, por lo que cuidados veterinarios regulares y una dieta balanceada son esenciales para su bienestar general.";
                        break;
                    case (predictedClass == 84):
                        mensaje = "German Shepherd";
                        descripcion = "El Pastor Alemán es una raza canina originaria de Alemania, reconocida por su inteligencia, lealtad y versatilidad. Con un pelaje doble de longitud media, estos perros son conocidos por su apariencia atlética y orejas erguidas. Además de ser populares como perros policías y de búsqueda y rescate, los Pastores Alemanes son excelentes compañeros familiares. Requieren ejercicio regular y estimulación mental para mantenerse saludables y felices. Con una esperanza de vida de alrededor de 9 a 13 años, es esencial proporcionarles cuidados veterinarios regulares y una dieta equilibrada para garantizar su bienestar general.";
                        break;
                    case (predictedClass == 85):
                        mensaje = "Doberman";
                        descripcion = "El Doberman es una raza de perro conocida por su apariencia elegante y atlética, con un pelaje corto y liso. Originario de Alemania, es reconocido por su inteligencia, lealtad y valentía. Estos perros son excelentes guardianes y compañeros leales para la familia. Requieren ejercicio regular y socialización temprana. Aunque tienen una reputación de ser protectores, los Dobermans también pueden ser cariñosos. Con una esperanza de vida de alrededor de 10 a 12 años, es importante brindarles cuidados veterinarios regulares y una dieta adecuada para mantener su salud y vitalidad.";
                        break;
                    case (predictedClass == 86):
                        mensaje = "Miniature Pinscher";
                        descripcion = "El Pinscher Miniatura, también conocido como Min Pin, es una raza de perro pequeña pero vigorosa originaria de Alemania. Con un pelaje corto y suave, estos perros son conocidos por su apariencia elegante y alerta. A pesar de su tamaño compacto, son enérgicos, valientes y poseen una personalidad vivaz. Requieren ejercicio regular y estimulación mental para satisfacer sus necesidades activas. Aunque pueden ser tercos, los Miniature Pinschers son leales y afectuosos con sus dueños. Con una esperanza de vida de alrededor de 12 a 14 años, es esencial proporcionarles cuidados veterinarios regulares y una dieta balanceada para asegurar su bienestar general.";
                        break;
                    case (predictedClass == 87):
                        mensaje = "Greater Swiss Mountain Dog";
                        descripcion = "El Greater Swiss Mountain Dog, o Gran Boyero Suizo, es una raza de perro grande y robusta originaria de Suiza. Con un pelaje corto y denso, tienen un manto tricolor que incluye negro, blanco y óxido. Estos perros son conocidos por su naturaleza amigable, lealtad y temperamento equilibrado. A pesar de su tamaño, son afectuosos y adecuados como compañeros familiares. Requieren ejercicio regular y socialización temprana para su desarrollo adecuado. Con una esperanza de vida de alrededor de 8 a 11 años, es importante brindarles cuidados veterinarios regulares y una dieta apropiada para mantener su salud y bienestar general.";
                        break;
                    case (predictedClass == 88):
                        mensaje = "Bernese Mountain Dog";
                        descripcion = "El Bernese Mountain Dog, o Boyero de Berna, es una raza canina grande y robusta originaria de Suiza. Con un pelaje largo y sedoso de tres colores distintivos (negro, blanco y óxido), estos perros son conocidos por su temperamento equilibrado, lealtad y afectuosidad. A pesar de su tamaño, son amigables y adecuados como compañeros familiares. Requieren ejercicio moderado y atención especial a su pelaje. Con una esperanza de vida de alrededor de 7 a 10 años, es esencial proporcionarles cuidados veterinarios regulares y una dieta balanceada para asegurar su salud y bienestar general.";
                        break;
                    case (predictedClass == 89):
                        mensaje = "Appenzeller";
                        descripcion = "El Appenzeller es una raza de perro suizo de tamaño mediano conocida por su pelaje corto y denso, generalmente tricolor con marcas distintivas. Estos perros son enérgicos, inteligentes y leales. Originarios de los Alpes suizos, los Appenzellers son conocidos por ser buenos perros de pastoreo y guardianes. Aunque pueden ser reservados con extraños, son afectuosos con sus familias. Requieren ejercicio regular y socialización temprana. Con una esperanza de vida de alrededor de 12 a 14 años, cuidados veterinarios regulares y una dieta adecuada son fundamentales para mantener su salud y vitalidad.";
                        break;
                    case (predictedClass == 90):
                        mensaje = "Entlebucher";
                        descripcion = "El Entlebucher es una raza de perro suizo compacta y robusta, conocida por su pelaje corto y tricolor. Estos perros son enérgicos, inteligentes y leales, con una fuerte disposición de trabajo. Originarios de los Alpes suizos, los Entlebuchers son excelentes pastores y guardianes. Aunque pueden ser reservados con extraños, son afectuosos con sus familias. Requieren ejercicio regular y estimulación mental. Con una esperanza de vida de alrededor de 10 a 15 años, es importante brindarles cuidados veterinarios regulares y una dieta adecuada para mantener su salud y bienestar general.";
                        break;
                    case (predictedClass == 91):
                        mensaje = "Boxer";
                        descripcion = "El Boxer es una raza de perro mediana a grande originaria de Alemania, reconocida por su apariencia musculosa y su mandíbula fuerte. Con un pelaje corto y brillante, estos perros son conocidos por ser enérgicos, juguetones y leales. Son excelentes compañeros familiares y se llevan bien con los niños. Requieren ejercicio regular y socialización temprana para su desarrollo adecuado. Aunque pueden ser tercos, los Boxers son inteligentes y responden bien al entrenamiento. Con una esperanza de vida de alrededor de 10 a 12 años, es fundamental proporcionarles cuidados veterinarios regulares y una dieta balanceada para asegurar su bienestar general.";
                        break;
                    case (predictedClass == 92):
                        mensaje = "Bull Mastiff";
                        descripcion = "El Bullmastiff es una raza de perro grande y poderosa, originaria de Inglaterra. Reconocido por su apariencia musculosa y cabeza prominente, este perro tiene un pelaje corto y denso. Los Bullmastiffs son conocidos por ser leales, valientes y buenos guardianes. Aunque pueden parecer imponentes, son afectuosos y tranquilos en el hogar. Requieren ejercicio moderado y socialización temprana. Con una esperanza de vida de alrededor de 8 a 10 años, es esencial brindarles cuidados veterinarios regulares y una dieta equilibrada para asegurar su salud y bienestar general.";
                        break;
                    case (predictedClass == 93):
                        mensaje = "Tibetan Mastiff";
                        descripcion = "El Mastín Tibetano es una raza de perro imponente y majestuosa, originaria del Tíbet. Con un pelaje largo y denso, especialmente alrededor del cuello, estos perros son conocidos por su apariencia llamativa y su actitud calmada. Los Mastines Tibetanos son leales, independientes y valientes, características que los han convertido en excelentes perros guardianes. Aunque pueden ser reservados con extraños, son afectuosos con sus familias. Requieren ejercicio moderado y atención especial a su pelaje. Con una esperanza de vida de alrededor de 10 a 14 años, es importante proporcionarles cuidados veterinarios regulares y una dieta adecuada para mantener su salud y bienestar general.";
                        break;
                    case (predictedClass == 94):
                        mensaje = "French Bulldog";
                        descripcion = "El Bulldog Francés es una encantadora raza de perro pequeña y compacta, originaria de Francia. Con orejas de murciélago y un hocico corto, estos perros tienen una apariencia distintiva. Con un pelaje corto y suave, son conocidos por ser amigables, juguetones y buenos compañeros. Aunque su tamaño es pequeño, tienen una personalidad valiente y afectuosa. Requieren ejercicio moderado y son adecuados para la vida en interiores. Con una esperanza de vida de alrededor de 10 a 12 años, es fundamental brindarles cuidados veterinarios regulares y una dieta equilibrada para asegurar su bienestar general.";
                        break;
                    case (predictedClass == 95):
                        mensaje = "Great Dane";
                        descripcion = "El Gran Danés es una raza de perro de gran tamaño y elegante, originaria de Alemania. Conocido por su altura impresionante y su pelaje corto y brillante, este perro es amigable, gentil y se destaca por su temperamento tranquilo. A pesar de su imponente apariencia, es afectuoso y bien adaptado a la convivencia familiar. Requiere ejercicio moderado y atención especial a su alimentación debido a su tamaño. Con una esperanza de vida de alrededor de 7 a 10 años, los cuidados veterinarios regulares son esenciales para mantener su salud y bienestar general.";
                        break;
                    case (predictedClass == 96):
                        mensaje = "Saint Bernard";
                        descripcion = "El San Bernardo es una raza de perro grande y gentil, originaria de los Alpes suizos. Con un pelaje denso y suave, y una expresión amigable, es conocido por su naturaleza cariñosa y su papel histórico como perro de búsqueda y rescate en la nieve. Aunque su tamaño puede ser imponente, los San Bernardos son excelentes compañeros familiares. Requieren ejercicio moderado y cuidados veterinarios regulares, especialmente para atender sus necesidades específicas debido a su tamaño. Con una esperanza de vida de alrededor de 8 a 10 años, son perros afectuosos que brindan lealtad y compañía a sus dueños.";
                        break;
                    case (predictedClass == 97):
                        mensaje = "Eskimo Dog";
                        descripcion = "El perro esquimal, también conocido como American Eskimo Dog, es una raza de perro de tamaño mediano con un pelaje denso y esponjoso, que le otorga una apariencia distintiva. Originario de Estados Unidos, es conocido por su inteligencia, agilidad y naturaleza alerta. Aunque puede ser reservado con extraños, el perro esquimal es leal, cariñoso y se lleva bien con la familia. Requiere ejercicio regular y atención a su pelaje para mantener su salud y bienestar. Con una esperanza de vida de alrededor de 12 a 16 años, los cuidados veterinarios regulares y una dieta adecuada son fundamentales para garantizar su calidad de vida a lo largo de los años.";
                        break;
                    case (predictedClass == 98):
                        mensaje = "Malamute";
                        descripcion = "El Alaskan Malamute es una raza de perro grande y poderosa, originaria de Alaska. Con un pelaje denso y resistente, orejas triangulares y una expresión noble, estos perros son conocidos por su resistencia y fuerza. Aunque pueden parecer reservados, los Malamutes son afectuosos, leales y amigables. Requieren ejercicio regular y son ideales para actividades al aire libre. Dada su herencia de trabajo como perros de trineo, el Malamute necesita atención especial durante los climas cálidos. Con una esperanza de vida de alrededor de 10 a 14 años, los cuidados veterinarios regulares y una dieta equilibrada son esenciales para mantener su salud y vitalidad.";
                        break;
                    case (predictedClass == 99):
                        mensaje = "Siberian Husky";
                        descripcion = "El Siberian Husky es una raza de perro originaria del noreste de Siberia, Rusia. Conocido por su apariencia distintiva, con ojos azules o multicolores y pelaje espeso y erecto, este perro es enérgico, amigable y social. Aunque tiene una naturaleza independiente, el Husky siberiano es afectuoso y se lleva bien con la familia y otros perros. Requiere ejercicio regular y es especialmente adecuado para climas más fríos debido a su pelaje doble. Con una esperanza de vida de alrededor de 12 a 15 años, los cuidados veterinarios regulares y una dieta balanceada son esenciales para mantener su salud y bienestar general.";
                        break;
                    case (predictedClass == 100):
                        mensaje = "Affenpinscher";
                        descripcion = "El Affenpinscher es una raza de perro pequeña y de aspecto simpático, originaria de Alemania. Con su pelaje áspero y expresión facial distintiva, estos perros son conocidos por su personalidad animada y juguetona. Aunque son pequeños en tamaño, los Affenpinschers son valientes y a menudo se perciben como debido a su apariencia. Requieren ejercicio moderado y cuidado del pelaje para mantener su salud y apariencia. Con una esperanza de vida de alrededor de 12 a 14 años, los cuidados veterinarios regulares y una dieta adecuada son esenciales para garantizar su bienestar general.";
                        break;
                    case (predictedClass == 101):
                        mensaje = "Basenji";
                        descripcion = "El Basenji es una raza de perro originaria de África Central, conocida por ser pequeña, ágil y tener un pelaje corto y brillante. Este perro es famoso por su falta de ladrido típico, en lugar de ello, produce un sonido único conocido como. Aunque son independientes, los Basenjis son afectuosos y leales con sus dueños. Requieren ejercicio regular y son limpios por naturaleza. Con una esperanza de vida de alrededor de 12 a 16 años, los cuidados veterinarios regulares y una dieta adecuada son fundamentales para mantener su salud y vitalidad.";
                        break;
                    case (predictedClass == 102):
                        mensaje = "Pug";
                        descripcion = "El Pug es una raza de perro pequeña y encantadora originaria de China. Con su cuerpo compacto, arrugas distintivas y cola enroscada, los Pugs son conocidos por su expresión simpática y personalidad juguetona. Afectuosos y amigables, se llevan bien con niños y otros animales. Aunque tienen un pelaje corto, requieren cuidados regulares, especialmente en la cara arrugada. Los Pugs son propensos a problemas respiratorios debido a su estructura facial única, por lo que el ejercicio debe ser moderado. Con una esperanza de vida de alrededor de 12 a 15 años, los cuidados veterinarios regulares y una dieta balanceada son esenciales para mantener su salud y bienestar general.";
                        break;
                    case (predictedClass == 103):
                        mensaje = "Leonberg";
                        descripcion = "El Leonberg es una raza de perro de gran tamaño y majestuosa, originaria de Alemania. Con un pelaje denso y suave, melena distintiva y expresión noble, estos perros son conocidos por su temperamento equilibrado y lealtad. Aunque su apariencia puede resultar imponente, los Leonbergs son afectuosos, especialmente con sus familias. Requieren ejercicio moderado y atención a su pelaje, especialmente durante las épocas de muda. Con una esperanza de vida de alrededor de 8 a 10 años, los cuidados veterinarios regulares y una dieta equilibrada son esenciales para mantener su salud y vitalidad.";
                        break;
                    case (predictedClass == 104):
                        mensaje = "Newfoundland";
                        descripcion = "El Terranova es una raza de perro grande y poderosa, originaria de la isla de Terranova en Canadá. Con un pelaje denso y resistente al agua, así como una expresión gentil, estos perros son conocidos por ser amigables, trabajadores y leales. Son excelentes nadadores y han sido históricamente utilizados en tareas de rescate acuático. A pesar de su tamaño, son conocidos por su naturaleza tranquila y afectuosa, siendo excelentes compañeros familiares. Requieren ejercicio moderado y cuidado del pelaje para mantener su bienestar. Con una esperanza de vida de alrededor de 9 a 10 años, los cuidados veterinarios regulares y una dieta adecuada son esenciales para garantizar su salud a largo plazo.";
                        break;
                    case (predictedClass == 105):
                        mensaje = "Great Pyrenees";
                        descripcion = "El Gran Pirineo es una raza de perro grande y majestuosa, originaria de los Pirineos en Europa. Con un pelaje largo y denso, orejas triangulares y una expresión noble, estos perros son conocidos por su temperamento tranquilo y su lealtad como guardianes. Aunque pueden ser reservados con extraños, son afectuosos con sus familias. Requieren ejercicio moderado y cuidado del pelaje, especialmente durante las épocas de muda. Con una esperanza de vida de alrededor de 10 a 12 años, los cuidados veterinarios regulares y una dieta equilibrada son fundamentales para mantener su salud y vitalidad.";
                        break;
                    case (predictedClass == 106):
                        mensaje = "Samoyed";
                        descripcion = "El Samoyedo es una raza de perro de tamaño mediano a grande, originaria de Siberia. Con su pelaje blanco y esponjoso, orejas puntiagudas y cola enroscada sobre la espalda, estos perros son conocidos por su apariencia hermosa y expresión amigable. Además de ser compañeros cariñosos y leales, los Samoyedos tienen una naturaleza enérgica y son conocidos por su habilidad en actividades como el trineo y el pastoreo. Requieren ejercicio regular y cuidado del pelaje para mantener su salud y apariencia. Con una esperanza de vida de alrededor de 12 a 14 años, los cuidados veterinarios regulares y una dieta equilibrada son esenciales para su bienestar general.";
                        break;
                    case (predictedClass == 107):
                        mensaje = "Pomeranian";
                        descripcion = "El Pomerania es una raza de perro pequeña y encantadora, conocida por su pelaje esponjoso, cola enroscada sobre la espalda y expresión alerta. Originario de la región de Pomerania en Europa, este perro es juguetón, curioso y lleno de energía. A pesar de su diminuto tamaño, los Pomeranios son valientes y a menudo se perciben como grandes protectores. Requieren ejercicio moderado y cuidado del pelaje regular para mantener su salud y apariencia. Con una esperanza de vida de alrededor de 12 a 16 años, los cuidados veterinarios regulares y una dieta adecuada son fundamentales para garantizar su bienestar general.";
                        break;
                    case (predictedClass == 108):
                        mensaje = "Chow";
                        descripcion = "El Chow Chow es una raza de perro de origen chino, conocida por su apariencia distintiva con una melena de león, lengua de color azul-negro y su actitud digna. Estos perros son independientes, leales y a menudo reservados con extraños. A pesar de su naturaleza algo distante, son afectuosos con sus familias. Requieren socialización temprana y entrenamiento consistente debido a su fuerte personalidad. Con un pelaje denso, necesitan cuidado regular para mantener su salud y apariencia. Con una esperanza de vida de alrededor de 9 a 15 años, los cuidados veterinarios regulares y una dieta adecuada son esenciales para su bienestar general.";
                        break;
                    case (predictedClass == 109):
                        mensaje = "Keeshond";
                        descripcion = "El Keeshond es una raza de perro de tamaño mediano conocida por su pelaje denso y esponjoso, cola enrollada sobre la espalda y una característica facial. Originario de los Países Bajos, este perro es amistoso, enérgico y se lleva bien con la familia y otros animales. Los Keeshonds son conocidos por su naturaleza alerta y su disposición cariñosa. Requieren ejercicio regular y atención al pelaje para mantener su salud y apariencia. Con una esperanza de vida de alrededor de 12 a 15 años, los cuidados veterinarios regulares y una dieta balanceada son esenciales para su bienestar general.";
                        break;
                    case (predictedClass == 110):
                        mensaje = "Brabancon Griffon";
                        descripcion = "El Grifón de Bruselas, también conocido como Brabantino, es una raza de perro pequeña y encantadora originaria de Bélgica. Con su expresión facial distintiva, orejas erguidas y pelaje áspero, estos perros son conocidos por su apariencia peculiar y su personalidad vivaz. Los Grifones de Bruselas son afectuosos, leales y se llevan bien con la familia. Aunque su tamaño es pequeño, tienen una disposición valiente y juguetona. Requieren ejercicio moderado y cuidado del pelaje regular para mantener su bienestar. Con una esperanza de vida de alrededor de 12 a 15 años, los cuidados veterinarios regulares y una dieta adecuada son esenciales para garantizar su salud a lo largo de los años.";
                        break;
                    case (predictedClass == 111):
                        mensaje = "Pembroke";
                        descripcion = "El Welsh Corgi Pembroke es una raza de perro pequeña pero robusta, originaria de Gales. Con su cuerpo largo y bajo, orejas puntiagudas y cola corta, estos perros son conocidos por su apariencia encantadora y su inteligencia. Los Corgis Pembroke son cariñosos, enérgicos y se llevan bien con la familia. A pesar de su tamaño, tienen una naturaleza valiente y son buenos perros de compañía. Requieren ejercicio regular y atención a su dieta para mantener su salud y peso adecuados. Con una esperanza de vida de alrededor de 12 a 15 años, los cuidados veterinarios regulares y una alimentación equilibrada son esenciales para su bienestar general.";
                        break;
                    case (predictedClass == 112):
                        mensaje = "Cardigan";
                        descripcion = "El Welsh Corgi Cardigan es una encantadora raza de perro originaria de Gales, conocida por su cuerpo largo, orejas redondeadas y cola larga. Estos perros son cariñosos, inteligentes y se llevan bien con la familia. A pesar de su tamaño pequeño, los Corgis Cardigan son valientes y tienen una disposición enérgica. Requieren ejercicio regular y atención a su dieta para mantener su bienestar. Con una esperanza de vida de alrededor de 12 a 15 años, los cuidados veterinarios regulares y una alimentación adecuada son fundamentales para garantizar su salud y vitalidad a lo largo de los años.";
                        break;
                    case (predictedClass == 113):
                        mensaje = "Toy Poodle";
                        descripcion = "El Poodle Toy es una versión más pequeña de la conocida raza Poodle. Con su pelaje rizado y expresión inteligente, estos perros son conocidos por su elegancia y adaptabilidad. Los Poodles Toy son cariñosos, inteligentes y se llevan bien con la familia. A pesar de su tamaño diminuto, tienen una personalidad animada y juguetona. Requieren ejercicio moderado y cuidado del pelaje regular para mantener su bienestar. Con una esperanza de vida de alrededor de 12 a 15 años, los cuidados veterinarios regulares y una dieta equilibrada son esenciales para garantizar su salud a lo largo de su vida.";
                        break;
                    case (predictedClass == 114):
                        mensaje = "Miniature Poodle";
                        descripcion = "El Poodle Miniatura es una variante más pequeña de la popular raza Poodle. Con su pelaje rizado y expresión alerta, estos perros son conocidos por su inteligencia y elegancia. Los Poodles Miniatura son cariñosos, enérgicos y se llevan bien con la familia. A pesar de su tamaño reducido, tienen una disposición juguetona y adaptarse fácilmente a diferentes entornos. Requieren ejercicio moderado y cuidado del pelaje regular para mantener su bienestar. Con una esperanza de vida de alrededor de 12 a 15 años, los cuidados veterinarios regulares y una dieta equilibrada son esenciales para garantizar su salud a lo largo de su vida.";
                        break;
                    case (predictedClass == 115):
                        mensaje = "Standard Poodle";
                        descripcion = "El Poodle estándar es la versión más grande de la versátil raza Poodle. Con su pelaje rizado y expresión elegante, estos perros son conocidos por su inteligencia y versatilidad. Los Poodles estándar son cariñosos, enérgicos y tienen una disposición amigable. A pesar de su tamaño considerable, son adaptables y pueden ser excelentes compañeros familiares. Requieren ejercicio regular y cuidado del pelaje para mantener su bienestar. Con una esperanza de vida de alrededor de 10 a 15 años, los cuidados veterinarios regulares y una dieta equilibrada son esenciales para garantizar su salud a lo largo de su vida.";
                        break;
                    case (predictedClass == 116):
                        mensaje = "Mexican Hairless";
                        descripcion = "El Xoloitzcuintli, también conocido como el Perro Mexicano sin Pelo o simplemente Xolo, es una raza de perro nativa de México. Conocido por su característica ausencia de pelaje y su piel suave, el Xoloitzcuintli viene en tres tamaños: toy, miniatura y estándar. Estos perros son apreciados por su lealtad, inteligencia y naturaleza tranquila. Aunque pueden ser reservados con extraños, son afectuosos con sus familias. Requieren cuidado de la piel y protección contra el sol debido a la ausencia de pelaje. Con una esperanza de vida de alrededor de 12 a 15 años, los cuidados veterinarios regulares y una dieta adecuada son fundamentales para mantener su salud y bienestar general.";
                        break;
                    case (predictedClass == 117):
                        mensaje = "Dingo";
                        descripcion = "El Dingo es una especie de perro salvaje que se encuentra principalmente en Australia y otras regiones del sudeste asiático. Con un aspecto similar al perro doméstico, los dingos suelen tener un pelaje corto y de color amarillo a rojo. Son conocidos por su naturaleza salvaje e independiente, adaptándose bien a diversos hábitats, desde bosques hasta desiertos. Aunque pueden cazar en solitario o en grupos, los dingos son animales sociales que forman vínculos familiares. La conservación y protección de los dingos ha sido un tema importante debido a su papel único en el ecosistema australiano.";
                        break;
                    case (predictedClass == 118):
                        mensaje = "Dhole";
                        descripcion = "El Dhole, también conocido como perro salvaje de Asia, es una especie de cánido que se encuentra en diversas regiones del continente asiático. Con un aspecto similar al perro doméstico, los Dholes tienen pelaje corto y suelen presentar colores rojizos. Son animales sociales que viven en grupos, exhibiendo una estructura social cooperativa. Con habilidades de caza notables, los Dholes son depredadores eficientes que se alimentan de presas que pueden superar en número. Aunque han enfrentado amenazas y pérdida de hábitat, los esfuerzos de conservación buscan proteger a esta especie y preservar su papel en los ecosistemas asiáticos.";
                        break;
                    case (predictedClass == 119):
                        mensaje = "African Hunting Dog";
                        descripcion = "El Perro Salvaje Africano, también conocido como Licaón o Perro Salvaje Pintado, es una especie de cánido nativa de África. Caracterizado por su pelaje moteado y orejas grandes, los Perros Salvajes Africanos son cazadores cooperativos que viven en manadas sociales. Con una estructura social compleja, estas manadas son lideradas por una pareja reproductora. Aunque han enfrentado amenazas, como la pérdida de hábitat y enfermedades, los esfuerzos de conservación buscan proteger a esta especie y preservar su papel en los ecosistemas africanos.";
                        break;
                    default:
                        mensaje = "NO SE ENCONTRÓ EL NOMBRE DE LA RAZA";
                }
                const mensajeCompleto = mensaje + "<br> <br>" + descripcion;
                predictionResult.innerHTML = mensajeCompleto;
            };
        };
        reader.readAsDataURL(file);
    } else {
        alert('Selecciona una imagen antes de hacer clic en "Predecir".');
    }
}