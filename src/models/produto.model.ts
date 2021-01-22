import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, IsInt, IsNumberString } from 'class-validator';

export class Produto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '2e0c959f-beed-992b-f353-fee74de15fbc', description: 'Guid do produto' })
    public id: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @ApiProperty({ example: 'Arroz', description: 'Nome do produto' })
    public nome: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @ApiProperty({ example: '5Kg', description: 'Descrição do produto' })
    public descricao: string;

    @IsNumberString()
    @IsNotEmpty()
    @ApiProperty({ example: 10.50, description: 'Preço do produto' })
    public preco: number;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty({ example: 10, description: 'Quantidade do produto' })
    public quantidade: number;
}