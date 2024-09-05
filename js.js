'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const contactList = document.getElementById('contact-list');
    const searchInput = document.getElementById('search');
    const addContactBtn = document.getElementById('add-contact-btn');
    const deleteAllBtn = document.getElementById('delete-all-btn');
    const popup = document.getElementById('popup');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const contactForm = document.getElementById('contact-form');
    const cancelBtn = document.getElementById('cancel-btn');
    const effectBtn = document.getElementById('effect-btn');
    const profilePicInput = document.getElementById('profile-pic');
    const profilePicPreview = document.getElementById('profile-pic-preview');
    const contactCountDisplay = document.getElementById('contact-count');
    const updateAllBtn = document.getElementById('update-all-btn');
    const updateAllPopup = document.getElementById('update-all-popup');
    const updateAllForm = document.getElementById('update-all-form');
    const closeUpdateAllPopupBtn = document.getElementById('close-update-all-popup-btn');

    let contacts = [
        { id: 1, name: 'buroog swaed', phone: '0525822206', address: '123 Elm St', email: 'brwgswd@gmail.com', age: '20', profilePic: 'buroog.jpg' },
        { id: 2, name: 'elaf swaed', phone: '076-654-3870', address: '456 Oak St', email: 'elaf@egmaile.com', age: '15', profilePic: 'elaf.jpg' },
        { id: 3, name: 'naser swaed', phone: '055-987-766', address: '123 Elm St', email: 'naser22swd@gmail.com', age: '34', profilePic: 'naser.jpg' },
        { id: 4, name: 'nejme khateeb', phone: '096-6543-87', address: '456 Oak St', email: 'nejme123@egmaile.com', age: '25', profilePic: 'nejme.jpg' },
        { id: 5, name: 'arej swaed', phone: '050-764-366', address: '123 Elm St', email: 'arejsswd@gmail.com', age: '30', profilePic: 'arej.jpg' },
        { id: 6, name: 'aya jindawe', phone: '087-654-3210', address: '456 Oak St', email: 'ayajin@egmaile.com', age: '22', profilePic: 'aya.jpg' },
        { id: 7, name: 'nadine swaed', phone: '05357-200-06', address: '123 Elm St', email: 'nadine234s@gmail.com', age: '29', profilePic: 'nadine.jpg' },
        { id: 8, name: 'retaj sobeh', phone: '07-654-3210', address: '456 Oak St', email: 'retaj123@egmaile.com', age: '35', profilePic: 'retaj.jpg' },
        { id: 9, name: 'rawan habashi', phone: '054-589-2136', address: '123 Elm St', email: 'rawanh12@gmail.com', age: '24', profilePic: 'rawan.jpg' },
        { id: 10, name: 'roaia habashi', phone: '017-654-3210', address: '456 Oak St', email: 'r234@egmaile.com', age: '23', profilePic: 'roaia.jpg' },
    ];

    const updateContactCount = () => {
        contactCountDisplay.textContent = `Total Contacts: ${contacts.length}`;
    };

    const renderContacts = () => {
        contactList.innerHTML = '';
        contacts.sort((a, b) => a.name.localeCompare(b.name)).forEach(contact => {
            const contactItem = document.createElement('div');
            contactItem.className = 'contact-item';
            contactItem.dataset.id = contact.id;
            contactItem.innerHTML = `
                <img src="${contact.profilePic || 'https://via.placeholder.com/100'}" alt="${contact.name}'s Profile Picture">
                <span>${contact.name} - ${contact.phone}</span>
                <div class="actions">
                    <button class="update-btn">Update</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            contactList.appendChild(contactItem);
        });
        updateContactCount();
    };

    const openPopup = (contact = {}) => {
        document.getElementById('record-id').value = contact.id || '';
        document.getElementById('name').value = contact.name || '';
        document.getElementById('phone').value = contact.phone || '';
        document.getElementById('email').value = contact.email || '';
        profilePicPreview.src = contact.profilePic || '';
        profilePicPreview.style.display = contact.profilePic ? 'block' : 'none';
        popup.classList.remove('hidden');
    };

    const closePopup = () => {
        popup.classList.add('hidden');
    };

    contactList.addEventListener('click', (e) => {
        const id = e.target.closest('.contact-item').dataset.id;
        const contact = contacts.find(c => c.id == id);
        if (e.target.classList.contains('delete-btn')) {
            if (confirm(`Are you sure you want to delete the contact: ${contact.name}?`)) {
                contacts = contacts.filter(c => c.id != id);
                renderContacts();
            }
        } else if (e.target.classList.contains('update-btn')) {
            openPopup(contact);
        }
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(query));
        contactList.innerHTML = '';
        filteredContacts.sort((a, b) => a.name.localeCompare(b.name)).forEach(contact => {
            const contactItem = document.createElement('div');
            contactItem.className = 'contact-item';
            contactItem.dataset.id = contact.id;
            contactItem.innerHTML = `
                <img src="${contact.profilePic || 'https://via.placeholder.com/100'}" alt="${contact.name}'s Profile Picture">
                <span>${contact.name} - ${contact.phone}</span>
                <div class="actions">
                    <button class="update-btn">Update</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            contactList.appendChild(contactItem);
        });
        updateContactCount();
    });

    addContactBtn.addEventListener('click', () => openPopup());

    deleteAllBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete all contacts?')) {
            contacts = [];
            renderContacts();
        }
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('record-id').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value.replace(/-/g, ''); // Remove dashes for validation
        const email = document.getElementById('email').value;
        const profilePic = profilePicPreview.src || '';

        if (!name || !phone || phone.length !== 10 || isNaN(phone)) {
            alert('Please provide a valid name and a 10-digit numeric phone number.');
            return;
        }

        if (contacts.some(contact => contact.name === name && contact.id !== id)) {
            alert('A contact with this name already exists.');
            return;
        }

        if (id) {
            const contact = contacts.find(c => c.id == id);
            contact.name = name;
            contact.phone = phone;
            contact.email = email;
            contact.profilePic = profilePic;
        } else {
            contacts.push({
                id: Date.now(),
                name,
                phone,
                email,
                profilePic
            });
        }

        closePopup();
        renderContacts();
    });

    profilePicInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                profilePicPreview.src = event.target.result;
                profilePicPreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            profilePicPreview.src = '';
            profilePicPreview.style.display = 'none';
        }
    });

    cancelBtn.addEventListener('click', closePopup);
    closePopupBtn.addEventListener('click', closePopup);

    renderContacts();
});
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
    document.querySelector('.main').classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    document.querySelector('.footer').classList.toggle('dark-mode');
    document.querySelector('.modal-content').classList.toggle('dark-mode');
  }
  
  // Example button to toggle dark mode
  document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);