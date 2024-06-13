export class CreateCardType {
    siteId: number;
    methodology: string;
    name: string;
    description: string;
    color: string;
    responsableId: number;
    quantityPicturesCreate: number;
    quantityAudiosCreate: number;
    quantityVideosCreate: number;
    audiosDurationCreate: number;
    videosDurationCreate: number;
    quantityPicturesClose: number;
    quantityAudiosClose: number;
    quantityVideosClose: number;
    audiosDurationClose: number;
    videosDurationClose: number;

    constructor(
        siteId: number,
        methodology: string,
        name: string,
        description: string,
        color: string,
        responsableId: number,
        quantityPicturesCreate: number,
        quantityAudiosCreate: number,
        quantityVideosCreate: number,
        audiosDurationCreate: number,
        videosDurationCreate: number,
        quantityPicturesClose: number,
        quantityAudiosClose: number,
        quantityVideosClose: number,
        audiosDurationClose: number,
        videosDurationClose: number
    ) {
        this.siteId = siteId;
        this.methodology = methodology;
        this.name = name;
        this.description = description;
        this.color = color;
        this.responsableId = responsableId;
        this.quantityPicturesCreate = quantityPicturesCreate;
        this.quantityAudiosCreate = quantityAudiosCreate;
        this.quantityVideosCreate = quantityVideosCreate;
        this.audiosDurationCreate = audiosDurationCreate;
        this.videosDurationCreate = videosDurationCreate;
        this.quantityPicturesClose = quantityPicturesClose;
        this.quantityAudiosClose = quantityAudiosClose;
        this.quantityVideosClose = quantityVideosClose;
        this.audiosDurationClose = audiosDurationClose;
        this.videosDurationClose = videosDurationClose;
    }
}
export class UpdateCardTypeReq {
    id: number;
    methodology: string;
    name: string;
    description: string;
    color: string;
    responsableId: number;
    quantityPicturesCreate: number;
    quantityAudiosCreate: number;
    quantityVideosCreate: number;
    audiosDurationCreate: number;
    videosDurationCreate: number;
    quantityPicturesClose: number;
    quantityAudiosClose: number;
    quantityVideosClose: number;
    audiosDurationClose: number;
    videosDurationClose: number;
    status: string

    constructor(
        id: number,
        methodology: string,
        name: string,
        description: string,
        color: string,
        responsableId: number,
        quantityPicturesCreate: number,
        quantityAudiosCreate: number,
        quantityVideosCreate: number,
        audiosDurationCreate: number,
        videosDurationCreate: number,
        quantityPicturesClose: number,
        quantityAudiosClose: number,
        quantityVideosClose: number,
        audiosDurationClose: number,
        videosDurationClose: number,
        status: string
    ) {
        this.id = id;
        this.methodology = methodology;
        this.name = name;
        this.description = description;
        this.color = color;
        this.responsableId = responsableId;
        this.quantityPicturesCreate = quantityPicturesCreate;
        this.quantityAudiosCreate = quantityAudiosCreate;
        this.quantityVideosCreate = quantityVideosCreate;
        this.audiosDurationCreate = audiosDurationCreate;
        this.videosDurationCreate = videosDurationCreate;
        this.quantityPicturesClose = quantityPicturesClose;
        this.quantityAudiosClose = quantityAudiosClose;
        this.quantityVideosClose = quantityVideosClose;
        this.audiosDurationClose = audiosDurationClose;
        this.videosDurationClose = videosDurationClose;
        this.status = status
    }
}