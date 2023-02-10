import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class Chat {
    @ApiModelProperty({
        description: 'The server and user id of the chat'
    })
    id: {
        server: string;
        user: string;
        _serialized: string;
    };

    @ApiModelProperty()
    name: string;

    @ApiModelProperty()
    isGroup: boolean;

    @ApiModelProperty()
    isReadOnly: boolean;

    @ApiModelProperty()
    unreadCount: number;

    @ApiModelProperty()
    timestamp: number;

    @ApiModelProperty()
    pinned: boolean;

    @ApiModelProperty()
    isMuted: boolean;

    @ApiModelProperty()
    muteExpiration: number;
}