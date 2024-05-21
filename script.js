// Función para cargar el modelo H5
async function loadModel() {
    try {
        console.log("Cargando modelo...");
        const model = await tf.loadLayersModel('./modelo/model.json');
        console.log("Modelo cargado.");
        return model;
    } catch (error) {
        console.error("Error al cargar el modelo:", error);
    }
}

// Función para preprocesar la imagen
async function preprocessImage(image) {
    const tfImage = tf.browser.fromPixels(image).resizeNearestNeighbor([224, 224]).toFloat();
    const meanImageNetRGB = tf.tensor1d([123.68, 116.779, 103.939]);
    return tfImage.sub(meanImageNetRGB).div(tf.scalar(255));
}

// Llamar a la función togglePredictButtonVisibility() cada vez que cambie la imagen
document.getElementById('fileInput').addEventListener('change', togglePredictButtonVisibility);
async function predict() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
        alert('Por favor, selecciona un archivo de imagen.');
        return;
    }
    const model = await loadModel();
    if (!model) {
        console.error("El modelo no se cargó correctamente.");
        return;
    }
    const reader = new FileReader();
    reader.onload = async function (e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = async function () {
            try {
                const preprocessedImage = await preprocessImage(img);
                const input = preprocessedImage.reshape([1, 224, 224, 3]);
                const predictions = model.predict(input);
                let predictedClass = predictions.argMax(1).dataSync()[0];
                const probability = predictions.max().dataSync()[0];
                // Mappear la clase predicha a una etiqueta legible
                predictedClass = mapPredictedClass(predictedClass);
                const data = {
                    predictions: [
                        {
                            tagName: predictedClass.toString(), 
                            probability: probability
                        }
                    ]
                };
                console.log(`Predicted class: ${predictedClass}, Probability: ${probability}`);
                // Enviar la predicción al chatbot
                sendPredictionToChatBot(data);
                // Mostrar la imagen en el chat
                displayImagePreview(file);
            } catch (error) {
                console.error("Error al realizar la predicción:", error);
            }
        };
    };
    reader.readAsDataURL(file);
    const predictButton = document.getElementById('predictButton');
    if (predictButton) {
        predictButton.style.display = 'none';
    }
}

function submitQuestion() {
    const questionInput = document.getElementById('questionInput');
    const question = questionInput.value.trim(); 
    if (question !== '') {
        addMessage('user', question);
        askQuestion(question);
        questionInput.value = ''; 
    } else {
        alert('Por favor, ingrese una pregunta.');
    }
}

function togglePredictButtonVisibility() {
    const fileInput = document.getElementById('fileInput');
    const predictButton = document.getElementById('predictButton');
    if (fileInput.files.length > 0) {
        predictButton.style.display = 'inline-block';
    } else {
        predictButton.style.display = 'none';
    }
}

function sendPredictionToChatBot(data) {
    if (data.predictions && data.predictions.length > 0) {
        const sortedPredictions = data.predictions.sort((a, b) => b.probability - a.probability);
        const topPrediction = sortedPredictions[0];
        const predictionMessage = `${topPrediction.tagName}`;
        // Preguntar al chatbot sobre la predicción
        askQuestion(predictionMessage);
    } else {
        // Enviar un mensaje al chatbot si no se pudo realizar la predicción
        addMessage('bot', 'No se pudo realizar la predicción.');
    }
}

async function askQuestion(question) {
    var request = {
        top: 3,
        question: question,
        includeUnstructuredSources: true,
        confidenceScoreThreshold: 0.5,
        answerSpanRequest: {
            enable: true,
            topAnswersWithSpan: 1,
            confidenceScoreThreshold: 0.5
        }
    };
    // Llamar a la API de QnA Maker para obtener una respuesta
    try {
        const response = await fetch("https://chatbotperros.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=ChatBotDePerros&api-version=2021-10-01&deploymentName=production", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": "a3bc471c4c2048f1afa5bf95c7e30f23", 
            },
            body: JSON.stringify(request)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        var answer = data.answers[0].answer;
        // Agregar la respuesta del chatbot al chat
        addMessage('bot', answer);
    } catch (error) {
        console.error("Error:", error);
    }
}

function addMessage(sender, message) {
    var chatBox = document.getElementById("chatBox");
    var messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.classList.add(sender + "-message");
    messageElement.innerHTML = message;
    chatBox.appendChild(messageElement);
}

function displayImagePreview(imageFile) {
    const chatBox = document.getElementById('chatBox');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add('user-message');
    const imageElement = document.createElement('img');
    imageElement.src = URL.createObjectURL(imageFile);
    imageElement.width = 100;
    imageElement.height = 100;
    messageElement.appendChild(imageElement);
    chatBox.appendChild(messageElement);
}
