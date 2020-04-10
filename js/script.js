$(document).ready(function(){
    blockspring.runParsed("query-public-google-spreadsheet", { "query": "SELECT B, C, D, E, F, G", "url": "https://docs.google.com/spreadsheets/d/1dVSIfLp28wyz1dbMp5HCw5iZWOVowCudF98M-wp8gJY/edit?usp=sharing"}, function(res){
        items = res.params.data.reverse();
        console.log(items);
        $.each(items, function(index, value) {
            var regExp = /\(([^)]+)\)/;
            var date = regExp.exec(value["Today's Date"]);
            date = date[1] + "/";
            date = date.replace(/,/g, '/');
            date = date.substr(4) + date.substr(0, 4);
            date = date.substr(1);
            month = parseInt(date.substr(0, date.indexOf('/'))) + 1;
            date = month.toString() + `/` + date.substring(date.indexOf('/') + 1);
            console.log(date);
            var name = value["Your Name"];
            if (name == null) {
                name = "Anonymous";
            }
            var title = value["Article/Post Title"];
            var description = value["Article/Post Description"];
            var link = value["Link to Article"];
            var image = `<img class="image" src="${value["Link to Image"]}" />`;
            var blank = "_blank";
            if (value["Link to Image"] == null) {
                image = "";
            }
            if (link == "N/a" || link == null) {
                link = "#";
                blank = "";
            }
            var entry = `
            <div class="entry">
                <a class="entry-link" target="${blank}" href="${link}">
                    <span class="submitter">Submitted by ${name} on ${date}</span>
                    <span class="title">${title}</span>
                    <p class="description">
                        ${description}
                    </p>
                    ${image}
                </a>
            </div>`;
            $(entry).appendTo(".container");
        });
    })
  });