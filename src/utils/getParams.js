export const getParams = (query) => {
    if (query) {
        const _a = query.split('?')[1];
        const _b = _a.split('&');
        const _object = {}
        _b.forEach(_p => {
            const _final = _p.split('=')
            _object[_final[0]] = _final[1];
        });
        return _object;
    }
    return {}
}