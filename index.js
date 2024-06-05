import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));
//app.use(methodOverride("_method"));

const titles = [];
const contents = [];
let toEdit = -1;
let toView = -1;

app.get("/", (req,res) => {
    res.render("index.ejs", {
        titles: titles,
        contents: contents,
    });
})

app.get("/create", (req,res) => {
    res.render("create.ejs");
})

app.post("/creating", (req,res) => {
    const {title, content} = req.body;
    titles.push(title);
    contents.push(content);

    // const data = `<%- include("partials/header.ejs") %>\n<p>${content}</p>\n<%- include("partials/footer.ejs") %>`;
    // fs.writeFile(`views/pages/${title}.ejs`, data, {encoding: "utf-8"}, (err) => {
    //     if (err) throw err;
    // })

    // const dat = `\napp.get("/${title}", (req,res) => {res.render("/pages/${title}.ejs");})`
    // fs.appendFile("C:\\Users\\mithu\\OneDrive\\Desktop\\Backend\\4.5 Capstone Project\\index.js", dat, {encoding: "utf-8"}, (err) => {
    //     if(err) throw err;
    // });
    
    res.redirect("/");
})

app.get("/delete", (req,res) => {
    res.render("delete.ejs");
})
app.post("/deleting", (req,res) => {
    const delTitle = req.body['delTitle'];
    for(let i=0; i<titles.length; i++){
        if(titles[i] === delTitle){
            titles.splice(i,1);
            contents.splice(i,1);
            break;
        }
    }
    res.redirect("/");
})

app.get("/edit", (req,res) => {
    res.render("edit.ejs");
})
app.post("/toupdate", (req,res) => {
    const title = req.body['title'];
    for(let i=0; i<titles.length; i++){
        if(titles[i] === title){
            toEdit = i;
            break;
        }
    }
    
    res.render("toupdate.ejs",{
        title: titles[toEdit],
        content: contents[toEdit],
    });
})
app.post("/editing", (req,res) => {
    contents[toEdit] = req.body['content'];
    res.redirect("/");
})

app.get("/view", (req,res) => {
    res.render("view.ejs");
})
app.post("/toview", (req,res) => {
    const title = req.body['title'];
    for(let i=0; i<titles.length; i++){
        if(titles[i] === title){
            toView = i;
            break;
        }
    }
    console.log(`Index of element is ${toView}`);

    res.render("toview.ejs",{
        title: titles[toView],
        content: contents[toView],
    })
})
app.get("/viewing", (req,res) => {
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Server created in port ${port}`);
})
