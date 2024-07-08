# Monly
Simplifies tracking your expenses and managing your budget effortlessly
![monly](https://github.com/kevinhellos/monly/assets/126497052/8886d475-742b-4c8b-84ef-7b077902a24e)

# Tech stack
- Next JS 14
- Tailwind CSS
- Daisy UI
- Firebase

## Firebase security rules
The security rules enforced that a user can only add, access, edit and delete their own expenses.
<pre>
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /Expenses/{userId}/Data/{expenseId} {
      allow create, read, update, delete: if request.auth != null && request.auth.uid == userId;
    }
  }
}
</pre>

## Author
- [Kevin](https://kevin.com.se)

## License
This project is open source and available under the [MIT License](LICENSE).

## Credits
Icon by [Flaticon](https://www.flaticon.com/)
