const dropArea = document.querySelector(".contenido");
const dragText = dropArea.querySelector('h2');
const button = dropArea.querySelector('button');
const input = dropArea.querySelector('#input-file');
let files;

button.addEventListener('click', e => {
    input.click();
});

input.addEventListener('change', e =>{
    files = this.files;
    dropArea.classList.add("active");
    showFiles(files);
    dropArea.classList.remove("active");
});


dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Suelta para subir los archivos"
})

dropArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra y suelta imagenes"


})

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    files = e.dataTransfer.files;
    showFiles(files);
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra y suelta imagenes"
})

function showFiles(files){
    if(files.lenght === undefined){
        processFile(files);
    } else {
        for( const file of files){
            processFile(file)
        }
    }
}

function processFile(file){
    const docType = file.type; 
    const validExtensions = /(.pdf)$/i;


    if(validExtensions.includes(docType)){
        // archivo valido
        const fileReader = new FileReader();
        const id = `file-${Math.random().toString(32).substring(7)}`;

        fileReader.addEventListener('load', e => {
            const fileUrl = fileReader.result;
            const image = `
            <div id="${id}" class="file-container">
                <img src="${fileUrl}" alt="${file.name}" width="50px">
                <div class="status">
                    <span>${file.name}</span>
                    <span class="status-text">
                        Loading...
                    </span>
                </div>
            </div>
            `;
            const html = document.querySelector("#preview").innerHTML;
            document.querySelector('#preview').innerHTML = image + html;

        });

      fileReader.readAsDataURL(file); 
      uploadFile(file, id);
    } else {
        // no es valido
        alert("No es un archivo valido!")
    }
}

function uploadFile(file){

}
