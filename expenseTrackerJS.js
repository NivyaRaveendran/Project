document.getElementById('expenseForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // expense name,amount  and description
    const expenseName = document.getElementById('expenseName').value;
    const expenseAmount = document.getElementById('expenseAmount').value;
    const expensedescription=document.getElementById('expensedescription').value;
    // object to represent the expense
    const expense = {
      name: expenseName,
      amount: expenseAmount,
      description:expensedescription
    };
  
    // Check if there are any existing expenses in local storage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    // Add the new expense to the expenses array
    expenses.push(expense);
  
    // Store the updated expenses array in local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));
  
    // Clear the form inputs
    document.getElementById('expenseName').value = '';
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expensedescription').value = '';
    // Refresh the expense list
    displayExpenses();
  });
  function displayExpenses() {
    // Get the expenses from local storage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    // Get the expense list container element
    const expenseList = document.getElementById('expenseList');
  
    // Clear the existing content
    expenseList.innerHTML = '';
  
    // Loop through the expenses and generate HTML for each expense
    expenses.forEach(function(expense, index) {
      const expenseItem = document.createElement('li');
      expenseItem.innerHTML = `
        <span>${expense.name}</span>
        <span>${expense.amount}</span>
        <span>${expense.description}</span>
        <button class="btn btn-danger" onclick="deleteExpense(${index})">Delete</button>
        <button class="btn btn-danger" onclick="editExpense(${index})">Edit</button>

      `;
      expenseList.appendChild(expenseItem);
    });
  }
  
  
  displayExpenses();
  function deleteExpense(index) {
    // Get the expenses from local storage//
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    // Remove the expense at the specified index//
    expenses.splice(index, 1);
  
    // Store the updated expenses array in local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));
  
    // Refresh the expense list
    displayExpenses();
  }
  
  function editExpense(index) {
    // Get the expenses from local storage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    // Get the expense at the specified index
    const expense = expenses[index];
  
    // Populate the form inputs with the expense details//
    document.getElementById('expenseName').value = expense.name;
    document.getElementById('expenseAmount').value = expense.amount;
    document.getElementById('expensedescription').value = expense.description;
    // Remove the expense from the expenses array
    expenses.splice(index, 1);
  
    // Store the updated expenses in LS//
    localStorage.setItem('expenses', JSON.stringify(expenses));
  
    // Refresh //
    displayExpenses();
  }