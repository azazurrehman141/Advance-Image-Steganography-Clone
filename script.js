const encodeBtn = document.getElementById('encode-btn');
const decodeBtn = document.getElementById('decode-btn');
const aboutBtn = document.getElementById('about-btn');
const encodeContent = document.getElementById('encode-content');
const decodeContent = document.getElementById('decode-content');
const aboutContent = document.getElementById('about-content');
const allContent = [encodeContent, decodeContent, aboutContent];
const allBtns = [encodeBtn, decodeBtn, aboutBtn];

function showContent(contentToShow) {
	allContent.forEach(content => content.classList.remove('active'));
	allBtns.forEach(btn => btn.classList.remove('active'));
	contentToShow.classList.add('active');
	if (contentToShow === encodeContent) {
		encodeBtn.classList.add('active');
	} else if (contentToShow === decodeContent) {
		decodeBtn.classList.add('active');
	} else if (contentToShow === aboutContent) {
		aboutBtn.classList.add('active');
	}
}

encodeBtn.addEventListener('click', () => showContent(encodeContent));
decodeBtn.addEventListener('click', () => showContent(decodeContent));
aboutBtn.addEventListener('click', () => showContent(aboutContent));

document.addEventListener('DOMContentLoaded', () => {
	showContent(encodeContent);
});

function setupImageUpload(uploadAreaId, fileInputId, imagePreviewId) {
	const uploadArea = document.getElementById(uploadAreaId);
	const fileInput = document.getElementById(fileInputId);
	const imagePreview = document.getElementById(imagePreviewId);

	function handleFiles(files) {
		if (files.length > 0) {
			const file = files[0];
			if (file.type.startsWith('image/')) {
				const reader = new FileReader();
				reader.onload = function(e) {
					imagePreview.src = e.target.result;
					imagePreview.classList.add('show-img');
					uploadArea.classList.add('active');
				};
				reader.readAsDataURL(file);
			}
		}
	}

	uploadArea.addEventListener('click', () => {
		fileInput.click();
	});

	fileInput.addEventListener('change', (e) => {
		handleFiles(e.target.files);
	});

	uploadArea.addEventListener('dragover', (e) => {
		e.preventDefault();
		uploadArea.classList.add('drag-over');
	});

	uploadArea.addEventListener('dragleave', () => {
		uploadArea.classList.remove('drag-over');
	});

	uploadArea.addEventListener('drop', (e) => {
		e.preventDefault();
		uploadArea.classList.remove('drag-over');
		handleFiles(e.dataTransfer.files);
	});
}

setupImageUpload('uploadAreaEncode', 'fileInputEncode', 'imagePreviewEncode');
setupImageUpload('uploadAreaDecode', 'fileInputDecode', 'imagePreviewDecode');

const encryptionToggle = document.getElementById('encryption-toggle');
const encryptionPasswordDiv = document.querySelector('.encryption-password');

encryptionToggle.addEventListener('change', () => {
	if (encryptionToggle.checked) {
		encryptionPasswordDiv.style.display = 'block';
	} else {
		encryptionPasswordDiv.style.display = 'none';
	}
});

const themeSwitch = document.getElementById('theme-switch');
const lightModeIcon = document.getElementById('light');
const darkModeIcon = document.getElementById('dark');

const setTheme = (isDarkMode) => {
	if (isDarkMode) {
		document.body.classList.add('dark-mode');
		darkModeIcon.classList.remove('hidden');
		lightModeIcon.classList.add('hidden');
	} else {
		document.body.classList.remove('dark-mode');
		lightModeIcon.classList.remove('hidden');
		darkModeIcon.classList.add('hidden');
	}
};

document.addEventListener('DOMContentLoaded', () => {
	const savedTheme = localStorage.getItem('theme');
	const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	if (savedTheme) {
		setTheme(savedTheme === 'dark');
	} else {
		setTheme(prefersDark);
	}
});

themeSwitch.addEventListener('click', () => {
	const isDarkMode = document.body.classList.contains('dark-mode');
	const newTheme = !isDarkMode;
	setTheme(newTheme);
	localStorage.setItem('theme', newTheme ? 'dark' : 'light');
});