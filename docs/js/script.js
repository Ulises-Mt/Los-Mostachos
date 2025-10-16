document.addEventListener('DOMContentLoaded', () => {
    // --- Menú hamburguesa ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navOverlay = document.querySelector('.nav-overlay');
    const closeMenu = document.querySelector('.nav-overlay .close-menu');

    if (menuToggle && navOverlay && closeMenu) {
        menuToggle.addEventListener('click', () => {
            navOverlay.classList.add('show');
        });

        closeMenu.addEventListener('click', () => {
            navOverlay.classList.remove('show');
        });
    }
});

// Espera a que todo el contenido del HTML esté cargado antes de ejecutar el script.
document.addEventListener('DOMContentLoaded', function() {

    // Selecciona TODOS los botones que tengan la clase '.toggle-ingredients'.
    const buttons = document.querySelectorAll('.toggle-ingredients');

    // Itera sobre cada botón encontrado.
    buttons.forEach(button => {
        // A cada botón, le añade un "escuchador" de eventos para el 'clic'.
        button.addEventListener('click', function() {
            // Encuentra el div '.card-content' más cercano que contiene al botón.
            const cardContent = this.closest('.card-content');
            
            // Dentro de ese '.card-content', busca el div de los ingredientes.
            const ingredientsDiv = cardContent.querySelector('.ingredients');

            // Si el div de ingredientes existe...
            if (ingredientsDiv) {
                // ...alterna (quita o pone) la clase 'show'. Esto activa la animación en CSS.
                ingredientsDiv.classList.toggle('show');

                // Cambia el texto del botón dependiendo de si los ingredientes están visibles o no.
                const isShown = ingredientsDiv.classList.contains('show');
                if (isShown) {
                    this.textContent = 'Ocultar Ingredientes';
                } else {
                    this.textContent = 'Ver Ingredientes';
                }
            }
        });
    });
});






document.addEventListener('DOMContentLoaded', () => {
    // Datos iniciales del inventario
    let inventoryData = [
        { id: 1, name: 'Pan', packages: 20, quantity: 18, unit: 'pz' },
        { id: 2, name: 'Jamón', packages: 15, quantity: 1000, unit: 'gr' },
        { id: 3, name: 'Queso Americano', packages: 30, quantity: 12, unit: 'pz' },
        { id: 4, name: 'Mayonesa', packages: 10, quantity: 1000, unit: 'gr' },
        { id: 5, name: 'Mostaza', packages: 10, quantity: 250, unit: 'gr' },
        { id: 6, name: 'Lechuga', packages: 8, quantity: 10, unit: 'pz' },
        { id: 7, name: 'Jitomate', packages: 12, quantity: 1000, unit: 'gr' },
        { id: 8, name: 'Jalapeño', packages: 5, quantity: 300, unit: 'gr' },
        { id: 9, name: 'Salami', packages: 7, quantity: 100, unit: 'pz' },
        { id: 10, name: 'Queso Jalapeño', packages: 6, quantity: 12, unit: 'pz' },
        { id: 11, name: 'Queso Black Pepper', packages: 6, quantity: 12, unit: 'pz' },
        { id: 12, name: 'Aguacate', packages: 25, quantity: 1000, unit: 'gr' },
        { id: 13, name: 'Agua', packages: 25, quantity: 10, unit: 'pz' },
        { id: 14, name: 'Agua de Horchata', packages: 15, quantity: 10, unit: 'pz' },
        { id: 15, name: 'Coca-Cola', packages: 10, quantity: 16, unit: 'pz' }
    ];

    const tableBody = document.getElementById('inventory-body');
    const addForm = document.getElementById('add-product-form');
    const saveButton = document.getElementById('save-changes-btn');
    const feedbackMessage = document.getElementById('feedback-message');

    // --- FUNCIÓN PARA RENDERIZAR LA TABLA ---
    const renderTable = () => {
        tableBody.innerHTML = ''; // Limpiar la tabla antes de volver a dibujarla
        inventoryData.forEach(item => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', item.id);
            row.innerHTML = `
                <td>${item.name}</td>
                <td><input type="number" class="package-input" value="${item.packages}" min="0"></td>
                <td>${item.quantity}</td>
                <td>${item.unit}</td>
                <td><button class="delete-btn">Eliminar</button></td>
            `;
            tableBody.appendChild(row);
        });
    };

    // --- FUNCIÓN PARA AGREGAR PRODUCTO ---
    addForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evitar que la página se recargue
        const name = document.getElementById('product-name').value;
        const packages = parseInt(document.getElementById('product-packages').value);
        const quantity = parseInt(document.getElementById('product-quantity').value);
        const unit = document.getElementById('product-unit').value;

        if (name && !isNaN(packages) && !isNaN(quantity)) {
            const newItem = {
                id: Date.now(), // ID único basado en la fecha actual
                name,
                packages,
                quantity,
                unit
            };
            inventoryData.push(newItem);
            renderTable(); // Actualizar la tabla
            addForm.reset(); // Limpiar el formulario
        }
    });

    // --- FUNCIÓN PARA ELIMINAR PRODUCTO (usando delegación de eventos) ---
    tableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const row = e.target.closest('tr');
            const idToDelete = parseInt(row.getAttribute('data-id'));
            inventoryData = inventoryData.filter(item => item.id !== idToDelete);
            renderTable(); // Actualizar la tabla
        }
    });
    
    // --- FUNCIÓN PARA GUARDAR CAMBIOS ---
    saveButton.addEventListener('click', () => {
        const rows = tableBody.querySelectorAll('tr');
        rows.forEach(row => {
            const id = parseInt(row.getAttribute('data-id'));
            const newPackages = parseInt(row.querySelector('.package-input').value);

            const itemToUpdate = inventoryData.find(item => item.id === id);
            if (itemToUpdate) {
                itemToUpdate.packages = newPackages;
            }
        });
        
        // Simulación de guardado en el servidor
        console.log("Datos guardados:", inventoryData);

        // Mensaje de confirmación para el usuario
        feedbackMessage.textContent = '¡Inventario actualizado correctamente!';
        feedbackMessage.style.color = 'green';
        setTimeout(() => {
            feedbackMessage.textContent = '';
        }, 3000); // El mensaje desaparece después de 3 segundos
    });

    // Carga inicial de la tabla
    renderTable();
});


document.addEventListener('DOMContentLoaded', () => {
    // --- DATOS DE INVENTARIO (DEBERÍAN VENIR DEL APARTADO DE INVENTARIO O UN SERVIDOR) ---
    // Por ahora, usamos una simulación de tu inventario actual.
    // En una aplicación real, estos datos se cargarían del 'guardado' en inventario.html
    let currentInventory = [
        { id: 1, name: 'Pan', packages: 20, quantity: 1, unit: 'pz' }, // Ejemplo: 1 paquete = 1 pan
        { id: 2, name: 'Jamón', packages: 15, quantity: 250, unit: 'gr' },
        { id: 3, name: 'Queso Americano', packages: 30, quantity: 12, unit: 'pz' }, // Ejemplo: 1 paquete = 12 rebanadas
        { id: 4, name: 'Mayonesa', packages: 10, quantity: 500, unit: 'gr' },
        { id: 5, name: 'Mostaza', packages: 10, quantity: 250, unit: 'gr' },
        { id: 6, name: 'Lechuga', packages: 8, quantity: 1, unit: 'pz' }, // Ejemplo: 1 paquete = 1 lechuga entera
        { id: 7, name: 'Jitomate', packages: 12, quantity: 1, unit: 'kg' },
        { id: 8, name: 'Jalapeño', packages: 5, quantity: 300, unit: 'gr' },
        { id: 9, name: 'Salami', packages: 7, quantity: 150, unit: 'gr' },
        { id: 10, name: 'Queso Jalapeño', packages: 6, quantity: 12, unit: 'pz' },
        { id: 11, name: 'Queso Black Pepper', packages: 6, quantity: 12, unit: 'pz' },
        { id: 12, name: 'Aguacate', packages: 25, quantity: 1, unit: 'pz' }
    ];

    // --- CONSUMO UNITARIO DE MATERIALES POR CADA PRODUCTO FINAL ---
    // Unidades aquí representan la cantidad por CADA sándwich/bebida individual
    const productRecipes = {
        'chilo': {
            name: 'Sándwich Chilo',
            materials: [
                { name: 'Pan', qty: 2, unit: 'pz' }, // 2 rebanadas de pan
                { name: 'Jamón', qty: 50, unit: 'gr' },
                { name: 'Queso Americano', qty: 1, unit: 'pz' },
                { name: 'Lechuga', qty: 10, unit: 'gr' }, // Porción de una lechuga
                { name: 'Jitomate', qty: 30, unit: 'gr' },
                { name: 'Mayonesa', qty: 10, unit: 'gr' },
                { name: 'Mostaza', qty: 5, unit: 'gr' }
            ]
        },
        'monchoso': {
            name: 'Sándwich Monchoso',
            materials: [
                { name: 'Pan', qty: 2, unit: 'pz' },
                { name: 'Salami', qty: 40, unit: 'gr' },
                { name: 'Queso Jalapeño', qty: 1, unit: 'pz' },
                { name: 'Queso Black Pepper', qty: 1, unit: 'pz' },
                { name: 'Jalapeño', qty: 20, unit: 'gr' },
                { name: 'Aguacate', qty: 0.5, unit: 'pz' }, // Medio aguacate
                { name: 'Mayonesa', qty: 10, unit: 'gr' }
            ]
        },
        'coca': {
            name: 'Coca-Cola',
            materials: [{ name: 'Coca-Cola', qty: 1, unit: 'pz' }] // Asumimos que la coca es un producto de inventario
        },
        'agua': {
            name: 'Agua',
            materials: [{ name: 'Agua Embotellada', qty: 1, unit: 'pz' }] // Asumimos agua embotellada
        },
        'horchata': {
            name: 'Agua de Horchata',
            materials: [
                { name: 'Concentrado Horchata', qty: 100, unit: 'ml' },
                { name: 'Agua', qty: 200, unit: 'ml' }
            ]
        }
    };

    // --- Elementos del DOM ---
    const orderForm = document.getElementById('order-form');
    const orderDetailsDiv = document.getElementById('order-details');
    const materialsNeededSection = document.getElementById('materials-needed-section');
    const materialsNeededBody = document.getElementById('materials-needed-body');
    const inventoryCheckSection = document.getElementById('inventory-check-section');
    const inventoryStatus = document.getElementById('inventory-status');
    const missingMaterialsList = document.getElementById('missing-materials-list');

    // Mapear el inventario para fácil acceso (nombre -> {qty_total, unit})
    const mapInventory = {};
    currentInventory.forEach(item => {
        // Calcular la cantidad total disponible en su unidad más pequeña (ej: gramos, piezas)
        mapInventory[item.name] = {
            total_qty: item.packages * item.quantity,
            unit: item.unit
        };
    });

    // --- FUNCIÓN PRINCIPAL PARA CALCULAR EL PEDIDO Y VERIFICAR INVENTARIO ---
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const quantities = {};
        let totalItems = 0;
        
        // Recoger las cantidades de los inputs
        document.querySelectorAll('.product-selection input[type="number"]').forEach(input => {
            const productId = input.dataset.productId;
            const qty = parseInt(input.value);
            if (qty > 0) {
                quantities[productId] = qty;
                totalItems += qty;
            }
        });

        if (totalItems === 0) {
            orderDetailsDiv.innerHTML = '<p class="feedback-message error">Por favor, selecciona al menos un producto.</p>';
            materialsNeededSection.style.display = 'none';
            inventoryCheckSection.style.display = 'none';
            return;
        }

        // --- 1. MOSTRAR DETALLES DEL PEDIDO ---
        let orderSummaryHtml = '<h3>Tu Pedido:</h3><ul>';
        for (const productId in quantities) {
            orderSummaryHtml += `<li>${productRecipes[productId].name}: ${quantities[productId]} unidades</li>`;
        }
        orderSummaryHtml += '</ul>';
        orderDetailsDiv.innerHTML = orderSummaryHtml;

        // --- 2. CALCULAR MATERIALES NECESARIOS ---
        const materialsRequired = {};
        for (const productId in quantities) {
            const qtyOrdered = quantities[productId];
            productRecipes[productId].materials.forEach(material => {
                const materialName = material.name;
                const materialUnit = material.unit;
                const materialQty = material.qty * qtyOrdered;

                if (!materialsRequired[materialName]) {
                    materialsRequired[materialName] = { qty: 0, unit: materialUnit };
                }
                materialsRequired[materialName].qty += materialQty;
            });
        }

        // Renderizar tabla de materiales necesarios
        materialsNeededBody.innerHTML = '';
        for (const matName in materialsRequired) {
            const mat = materialsRequired[matName];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${matName}</td>
                <td>${mat.qty}</td>
                <td>${mat.unit}</td>
            `;
            materialsNeededBody.appendChild(row);
        }
        materialsNeededSection.style.display = 'block';

        // --- 3. VERIFICAR INVENTARIO ---
        const missing = [];
        for (const matName in materialsRequired) {
            const required = materialsRequired[matName];
            const available = mapInventory[matName];

            if (!available) {
                missing.push({ name: matName, needed: required.qty, unit: required.unit, available: 0 });
            } else if (available.total_qty < required.qty) {
                missing.push({ name: matName, needed: required.qty, unit: required.unit, available: available.total_qty });
            }
        }

        inventoryCheckSection.style.display = 'block';
        if (missing.length === 0) {
            inventoryStatus.className = 'feedback-message success';
            inventoryStatus.textContent = '¡Inventario Suficiente! Puedes hacer este pedido.';
            missingMaterialsList.innerHTML = '';
            missingMaterialsList.style.display = 'none';
        } else {
            inventoryStatus.className = 'feedback-message error';
            inventoryStatus.textContent = '¡Advertencia! Faltan materiales para completar este pedido.';
            
            let missingHtml = '<h4>Materiales Faltantes:</h4><ul>';
            missing.forEach(item => {
                const deficit = item.needed - item.available;
                missingHtml += `<li>${item.name}: Necesitas ${deficit} ${item.unit} más (disponibles: ${item.available} ${item.unit})</li>`;
            });
            missingHtml += '</ul>';
            missingMaterialsList.innerHTML = missingHtml;
            missingMaterialsList.style.display = 'block';
        }
    });
});
