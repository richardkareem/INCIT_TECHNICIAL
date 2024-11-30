

export default {
    caches:{},
    get(key) {return this.caches[key]},
    set(key, val) {this.caches[key] = val},   
}