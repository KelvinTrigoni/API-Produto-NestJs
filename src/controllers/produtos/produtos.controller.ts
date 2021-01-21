import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';

import { TokenAuthGuard } from 'src/token-auth.guard';
import { Produto } from 'src/models/produto.model';
import { ProdutosService } from "src/services/produtos/produtos.service";

@Controller('produtos')
export class ProdutosController {

    constructor(
        private produtosServices: ProdutosService
    ) { }

    @UseGuards(TokenAuthGuard)
    @Get()
    getProdutos(): Promise<Array<Produto>> {
        return this.produtosServices.getPodutos();
    }

    @UseGuards(TokenAuthGuard)
    @Get(':id')
    getProdutosById(@Param('id') id: string): Promise<Produto> {
        return this.produtosServices.getPodutosById(id);
    }

    @UseGuards(TokenAuthGuard)
    @Post()
    postProdutos(@Body() produto: Produto): Promise<any> {
        return this.produtosServices.postPodutos(produto);
    }

    @UseGuards(TokenAuthGuard)
    @Put()
    putProduto(@Body() produto: Produto): Promise<any> {
        return this.produtosServices.putProduto(produto);
    }

    @UseGuards(TokenAuthGuard)
    @Delete(':id')
    deleteProduto(@Param('id') id: string): Promise<any> {
        return this.produtosServices.deleteProduto(id);
    }
}
