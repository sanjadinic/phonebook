var db = openDatabase('phonebook', '1.0', 'Phonebook', '12000');
	function init(){
		db.transaction( function(tx){
			tx.executeSql('CREATE TABLE IF NOT EXISTS TBL_PHONEBOOK(ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, firstname TEXT NOT NULL, lastname TEXT, phonenumber TEXT NOT NULL)');
		})

		displayAll();
	}

	function displayAll(tx){
		db.transaction( function(tx){
			tx.executeSql('select * from tbl_phonebook', [], function(tx, results){
				var n = results.rows.length;
				var s = '<table cellpading="2" cellspacing="2" border="1" id="phonebook">';
				s += '<tr><th>ID</th><th>first name</th><th>last name</th><th>phone number</th><th>Options</th>';
				for (var i = 0; i<n; i++) {
					var tbl_phonebook = results.rows.item(i);
					s += '<tr id="data">';
					s += '<td>'+ tbl_phonebook.ID + '</td>';
					s += '<td>'+ tbl_phonebook.firstname + '</td>';
					s += '<td>'+ tbl_phonebook.lastname + '</td>';
					s += '<td>'+ tbl_phonebook.phonenumber + '</td>'
					s += '<td><a href="#" onclick="del('+ tbl_phonebook.ID +')">Delete</a></td>';
					s += '</tr>';
				}

				s += '</table>';
				document.getElementById('result').innerHTML = s;

			});

		})
	}

	function add(){
		db.transaction( function(tx){
			var firstname = document.getElementById('workName').value;
			var lastname = document.getElementById('lastname').value;
			var phonenumber = document.getElementById('phonenumber').value;
			tx.executeSql('insert into tbl_phonebook(firstname, lastname, phonenumber) values(?,?,?)', [firstname, lastname, phonenumber], displayAll());
			
		})
	}
	function del(ID){
		db.transaction( function(tx){
		var result = confirm('Are you sure?');
		if (result === true)
             tx.executeSql('delete from tbl_phonebook where ID=?', [ID], displayAll());
        
     })
	}
	$(document).ready(function(){
		$('#search').keyup(function(){
			search_table($(this).val());
		});

		function search_table(value){
			$('#data').each(function(){
				var found = 'false';
				$(this).each(function(){
					if($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0)
						{
							found = 'true';
						}
					});
				if(found == 'true')
				{
					$(this).show();	
				}
				else 
				{
					$(this).hide();	
				}
			});

		}
	})