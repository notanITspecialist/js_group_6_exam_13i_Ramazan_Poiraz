const {I} = inject();

When('нажимаю на кнопку {string}', text => {
    I.click(`${text}`);
});

When('я нахожусь на странице {string}', text => {
    I.amOnPage(`/${text}`);
});

When('я заполняю поля формы:', table => {
    const tableData = table.parse().rawData;

    tableData.forEach(row => {
        I.fillField(row[0], row[1]);
    })
});

When('я вижу текст {string}', text => {
    I.waitForText(text, 3);
});

When('я заполняю поля формы добавления:', table => {
    const tableData = table.parse().rawData;

    tableData.forEach(row => {
        I.fillField(row[0], row[1]);
    });
});

Given('я жду {string}', number => {
    I.wait(number)
});