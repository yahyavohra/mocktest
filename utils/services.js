export const SplitTwo = (value) => {
    var split_var = value.split(' ')
    return split_var[0]
}

export const handleGetAllUnique = (posts, key) => {
    const uniqueData = posts.filter((e) => {
        return e[`${key}`] != null ? !(posts[e[`${key}`]] = e[`${key}`] in posts) : null
    })
    return uniqueData
}

export const cleanObj = (obj) => {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
            delete obj[propName];
        }
    }
    return obj
}

export const updateData = async (cleanValue, data) => {

    const filter_logger = data.filter((item) => {
        for (var key in cleanValue) {
            if (key !== 'sortby') {
                if (key == 'from_date' || key == 'to_date') {

                    if (key == 'from_date' && key == 'to_date' && SplitTwo(item.creationTimestamp) < value.from_date || SplitTwo(item.creationTimestamp) > cleanValue.to_date) {
                        return false
                    }
                    else if (key == 'from_date') { return SplitTwo(item.creationTimestamp) >= cleanValue.from_date }
                    else if (key == 'to_date') { return SplitTwo(item.creationTimestamp) <= cleanValue.to_date }

                } else {

                    if (item[key] === undefined || item[key] != cleanValue[key]) {
                        return false
                    }
                }
            }
        }
        return true
    })
    if (cleanValue["sortby"]) {

        return handleSorting(filter_logger, cleanValue.sortby)
    } else {
        return filter_logger
    }
}
export const format_Text = (value) => {
    if (value && typeof value == 'string') {
        value = value.replaceAll('_', ' ');
        value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

    } else if (!value) {
        value = '-/-'
    }
    return value
}
export const format_date = (value) => {
    if (value && typeof value == 'string') {
        value = value.replaceAll(' ', '  |  ');
    } else if (!value) {
        value = '-/-'
    }
    return value
}
export const handleSorting = async (data, key) => {
    const sortedData = [...data].sort((a, b) => {
        a = a[`${key}`]
        b = b[`${key}`]
        return a > b ? 1 : -1
    })
    return sortedData
}