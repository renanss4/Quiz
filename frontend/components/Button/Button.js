export function Button({type = 'default', size = 'large', text, imgSrc = null}) {
  const button = document.createElement('button')
  const p = document.createElement('p')
  p.textContent = text

  if (imgSrc) {
    const img = document.createElement('img')
    img.setAttribute('src', imgSrc)

    button.appendChild(img)
  }
  button.appendChild(p)

  const stylesByType =  {
    "default": "button-default",
    "outline": "button-outline",
    "destructive": "button-default-destructive",
    "destructive-outline": "button-outline-destructive"
  }

  const btnClass = stylesByType[type]
  button.classList.add(btnClass)

  const btnsSize = {
    "large": "size-large",
    "medium": "size-medium",
    "small": "size-small"
  } 

  const btnSize = btnsSize[size]
  button.classList.add(btnSize)

  return button
}