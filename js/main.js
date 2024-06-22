var nameInput = document.getElementById('name')
var url = document.getElementById('url')
var addBtn = document.getElementById('addBtn')
var tableBody = document.getElementById('tableBody')
var bookMarks;
var mainIndex = 0;
if (localStorage.getItem('bookmarks') == null)
{
  bookMarks = [];
} else
{
  bookMarks = JSON.parse(localStorage.getItem('bookmarks'));
  displayBook();
}
nameRegex = /^[A-Za-z_]{1,}$/
function isNameValid()
{
  if (nameRegex.test(nameInput.value)) return true;
  else return false;
}
var urlregex = /^(https:\/\/)?(www\.)?[A-Za-z0-9\.]{1,}\.[a-z]{3}$/
function isUrlValid()
{
  if (urlregex.test(url.value)) return true;
  else return false;
}
nameInput.onkeyup=function () {
  if (isNameValid()&&isUrlValid()) {
    addBtn.removeAttribute('disabled');
  }
  else addBtn.disabled='true';
}
url.onkeyup=function () {
  if (isNameValid()&&isUrlValid()) {
    addBtn.removeAttribute('disabled');
  }
  else addBtn.disabled='true';
}

addBtn.onclick = function ()
{
  if (addBtn.innerHTML == 'Update')
  {
    addBtn.innerHTML = 'Submit';
    // bookMarks.splice(mainIndex,1)
    var bookMark = {
      name: nameInput.value,
      url: url.value
    }
    bookMarks.splice(mainIndex, 1, bookMark);

  } else
  {
    var bookMark = {
      name: nameInput.value,
      url: url.value
    }
    bookMarks.push(bookMark)
  }

  // console.log(bookMarks);
  localStorage.setItem('bookmarks', JSON.stringify(bookMarks))
  displayBook()
  clear();

}
function displayBook(arr = bookMarks)
{
  var marks = ``
  for (let i = 0; i < arr.length; i++)
  {
    // 
    marks += `
    <tr>
      <td class="bg-secondary-subtle">${ arr[i].name }</td>
      <td class="bg-secondary-subtle"><a target="_blank" class="btn btn-primary" href="${ arr[i].url }">visit</a></td>
      <td class="bg-secondary-subtle"><button onclick="updateBook(${ i })" class="btn btn-info">update</button></td>
      <td class="bg-secondary-subtle"><button onclick="deleteBook(${ i })" class="btn btn-danger">delete</button></td>
    </tr>
    `


  }
  tableBody.innerHTML = marks
}
function deleteBook(index)
{
  bookMarks.splice(index, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookMarks))
  displayBook();
}

function clear()
{
  nameInput.value = ""
  url.value = ""

}
function updateBook(index)
{
  nameInput.value = bookMarks[index].name
  url.value = bookMarks[index].url
  addBtn.innerHTML = 'Update'
  mainIndex = index


}
function search(term)
{
  var wantedBook = []
  for (let i = 0; i < bookMarks.length; i++)
  {
    if (bookMarks[i].name.toLowerCase().includes(term))
    {
      wantedBook.push(bookMarks[i]);
    }
    displayBook(wantedBook)
  }

}
