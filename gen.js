const csv = require("ya-csv");

var reader = csv.createCsvFileReader("names.csv", {
  separator: ",",
  quote: '"',
  escape: '"',
  comment: ""
});

const list = [];

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const parse = d => {
  let l = d.split(",");
  l = l.map(s => s.trim());

  return l[0]
    .replace(".", "")
    .replace(/\(.*\)/g, "")
    .split(" ")
    .join(".");
};

reader.addListener("data", data => {
  const email = `${parse(data[0])}@ice.dhs.org`;
  if (validateEmail(email)) {
    list.push(`["${data[0]}", "${email}"]`);
  }
});

reader.addListener("end", () => {
  console.log(`var emails = [${list.join(",")}];`);
});
