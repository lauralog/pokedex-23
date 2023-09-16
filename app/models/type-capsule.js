/**
 * 
 * @param {object} pokemon object -> pokemon detail url 
 * @returns 
 */
export const renderTypeCapsule = (type) => {
    const typeCapsuleHTML = `
        <span class="type_icon bg-${type}">
            <img src="./assets/images/type-icons/${type}.svg" alt="${type}-icon">
        </span>
        <span class="type_text">
            <h4>${type}</h4>
        </span>
    `

    return typeCapsuleHTML
}
