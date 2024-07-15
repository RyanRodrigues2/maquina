function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    html2canvas(document.querySelector("#form-container")).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        let position = -pageHeight;
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        doc.save('formulario.pdf');
    });
}