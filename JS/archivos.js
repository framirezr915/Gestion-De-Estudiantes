const dropArea = document.querySelector(".contenido");
const dragText = dropArea.querySelector('h2');
const button = dropArea.querySelector('button');
const input = dropArea.querySelector('#input-file');
let files;



button.addEventListener('click', e => {
    input.click();
});



input.addEventListener('change', function(){
    let pdfFile = document.querySelector('#input-file').files[0];
    let pdfFileUrl = URL.createObjectURL(pdfFile);
    
    document.querySelector("#vista-previa").setAttribute('src', pdfFileUrl);

    files = this.files[0];
    dropArea.classList.add("active");
    showFiles();
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
    let pdfFile = document.querySelector('#input-file').files[0];
    let pdfFileUrl = URL.createObjectURL(pdfFile);
    
    document.querySelector("#vista-previa").setAttribute('src', pdfFileUrl);
    e.preventDefault();
    files = e.dataTransfer.files[0];
    showFiles();
});

function showFiles(){
    const fileType = files.type;
    const validExtensions = ["application/pdf","image/png"];

    if(validExtensions.includes(fileType)){
        const fileReader = new FileReader();
        fileReader.onload = () => {
            let fileUrl = fileReader.result;
            console.log(fileUrl);
            let imgTag = `<img src="${fileUrl}" alt="">`;
            dropArea.innerHTML = imgTag;
        }
    fileReader.readAsDataURL(files);
    } else {
        alert("Sube un archivo con la extension valida")
    
    }
}

function uploadFile(file){

}
