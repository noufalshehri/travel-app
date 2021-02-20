// accepets only strings in English
const regexp =
    '^[a-zA-Z]' //regular expression to test against

const validateString = (str) => {
    const pattern = new RegExp(regexp, 'i')
    return !!pattern.test(str)
}

export { validateString }
