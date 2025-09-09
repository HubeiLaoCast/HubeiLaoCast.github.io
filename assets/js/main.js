document.addEventListener('DOMContentLoaded', function () {
    // Change this ID to match your generated TOC
    const toc = document.getElementById('markdown-toc');

    if (!toc) {
        return;
    }

    const itemsWithChildren = toc.querySelectorAll('li');

    itemsWithChildren.forEach(item => {
        const nestedList = item.querySelector('ul');
        if (nestedList) {
            item.classList.add('has-nested');

            const link = item.querySelector('a');

            link.addEventListener('click', function (event) {
                event.preventDefault();
                item.classList.toggle('open');
            });
        }
    });
});