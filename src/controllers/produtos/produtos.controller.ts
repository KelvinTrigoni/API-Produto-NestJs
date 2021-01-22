import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { TokenAuthGuard } from 'src/jwt/token-auth.guard';
import { Produto } from 'src/models/produto.model';
import { ProdutosService } from "src/services/produtos/produtos.service";

@ApiBearerAuth()
@ApiTags('Produtos')
@UseGuards(TokenAuthGuard)
@Controller('produtos')
export class ProdutosController {

    constructor(
        private produtosServices: ProdutosService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Retorna todos os produtos' })
    getProdutos(): Promise<Array<Produto>> {
        return this.produtosServices.getPodutos();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retorna um produto específico' })
    getProdutosById(@Param('id') id: string): Promise<Produto> {
        return this.produtosServices.getPodutosById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Cria um produto', description: 'Criação não precisa de id' })
    postProdutos(@Body() produto: Produto): Promise<any> {
        return this.produtosServices.postPodutos(produto);
    }

    @Put()
    @ApiOperation({ summary: 'Altera um produto' })
    putProduto(@Body() produto: Produto): Promise<any> {
        return this.produtosServices.putProduto(produto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Exclui um produto' })
    deleteProduto(@Param('id') id: string): Promise<any> {
        return this.produtosServices.deleteProduto(id);
    }
}
