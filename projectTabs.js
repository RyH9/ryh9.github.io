function showCategory(category) {
    // Hide/show
	var cards = document.getElementsByClassName('project-card');
    for (var i = 0; i < cards.length; i++) 
	{
		if (category == 'all' || cards[i].id == category)
		{
			cards[i].style.display = 'flex';
		}
		else
		{
			cards[i].style.display = 'none';
		}
    }

    // Toggle buttons
    var links = document.getElementsByClassName('tab-link');
    for (var i = 0; i < links.length; i++) 
	{
        links[i].classList.remove('active');
    }
    event.target.classList.add('active');
}