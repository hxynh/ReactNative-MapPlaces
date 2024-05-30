class Place {
    constructor(title, imageUri, address, locaton) {
        this.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.locaton = location; // {lat: 0.432, lng: 123.455}
        this.id = new Date().toString() + Math.random().toString();        
    }
}

