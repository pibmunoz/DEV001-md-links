/**
 * returns quantity of unique links (no duplicates)
 */
const uniqueLinks = (links) => {
    let uniqueLinks = [];
    links.forEach(link => {
        if (!uniqueLinks.includes(link.href)) {
            uniqueLinks.push(link.href);
        }
    });
    return uniqueLinks.length;
}

/**
 * returns quantity of broken links
 */
const brokenLinks = (links) => {
    let brokenLinks = [];
    links.forEach(link => {
        if (link.ok === false) {
            brokenLinks.push(link.href);
        }
    });
    return brokenLinks.length;
}