import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { LocatairesService } from './locataires.service';
import { CreateLocataireDto } from './dto/create-locataire.dto';
import { Locataire } from './schemas/locataire.schema';

@Controller('locataires')
export class LocatairesController {
  constructor(private readonly locatairesService: LocatairesService) {}

  @Post()
  async create(@Body() createLocataireDto: CreateLocataireDto) {
    return await this.locatairesService.create(createLocataireDto);
  }

  @Get()
  async findAll(): Promise<Locataire[]> {
    return await this.locatairesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Locataire> {
    return await this.locatairesService.findOne(id);
  }

  @Get('email/:email')
  async findEmail(@Param('email') email: string): Promise<Locataire> {
    return await this.locatairesService.findEmail(email);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.locatairesService.delete(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string,@Body() createLocataireDto: CreateLocataireDto) {
    return await this.locatairesService.update(id,createLocataireDto);
  }
}
