function buttonLinks(links, displayText) {
    var ret = ``

    var count = 1;

    links.forEach(element => {


        if (links.length == 1) {
            if (links[0] == "") {

            }
            else {
                ret += `<a href="${element}"
                            target="_blank"> <button>${displayText}</button></a>`
            }
        }
        else if (links.length > 1) {
            ret += `<a href="${element}" 
                            target="_blank" style="text-decoration: none"> <button>${displayText} Part ${count}</button></a>`;
            count += 1;
        }
    })
    return ret
}



function parseCsv(data) {

    console.log(data.length);
    console.log(data);

    var ret = ""

    data.forEach(element => {

        console.log(element);


        const webLinks = element["web_links"].split(",");
        const pdfLinks = element["pdf_links"].split(",");

        const webButtons = buttonLinks(webLinks, "Read online");
        const pdfButtons = buttonLinks(pdfLinks, "Read pdf");


        const addStr = `
        
        <div class="item">
                    <article>
                        <img src="${element["image_path"]}" alt="${element["image_alt_text"]}">
                        <h3>${element["display_title"]}</h3>
                        <h4>${element["publisher"]}, ${element["month"]} ${element["year"]}</h4>
                        ${webButtons}
                        ${pdfButtons}
                        <p>${element["description"]} <br><br> ${element["my_role"]} </p>
                    </article>

                </div>
        
        `

        ret += addStr;

    });


    return ret
}

export function generateSamples(objectPath) {
    console.log(objectPath);

    const data = fetch(objectPath)
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            console.log(typeof (data))
            const add = parseCsv(data);
            const txt = `<div class="gallery">
                             <h2>My stories</h2>
                                <section>
                                    <div>
                                        ${add}
                                    </div>
                                </section>
                        </div>`
            document.querySelector('.gal').insertAdjacentHTML('afterbegin', txt);

        })
        .catch(error => console.error('Error fetching data:', error));

}


generateSamples("work_samples.json")