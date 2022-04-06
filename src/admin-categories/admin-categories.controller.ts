import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {AdminCategoriesService} from "./admin-categories.service";
import {CreateAdminCategoriesDto} from "./dto/create-admin-categories.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AdminCategories} from "./admin-categories.model";
import {UpdateAdminCategoriesDto} from "./dto/update-admin-categories.dto";

@ApiTags('Admin Categories')
@Controller('admin-categories')
export class AdminCategoriesController {

    constructor(
        private adminCategories: AdminCategoriesService
    ) {}

    @ApiOperation({ summary: 'Create admin category' })
    @ApiResponse({ status: 200, type: AdminCategories })
    @Roles('1', '2')
    @UseGuards(RolesGuard)
    @Post()
    createAdminCategories(@Body() createAdminCategories: CreateAdminCategoriesDto) {
        return this.adminCategories.create(createAdminCategories)
    }

    @ApiOperation({ summary: 'Get all the category' })
    @ApiResponse({ status: 200, type: [AdminCategories] })
    @Roles('1', '2')
    @UseGuards(RolesGuard)
    @Get()
    getAllAdminCategory() {
        return this.adminCategories.getAll();
    }

    @ApiOperation({ summary: 'Get one admin category' })
    @ApiResponse({ status: 200, type: AdminCategories })
    @Roles('1', '2')
    @UseGuards(RolesGuard)
    @Get(':id')
    getOneCategory(@Param('id') id: number) {
        return this.adminCategories.getOneAdminCategory(id);
    }

    @ApiOperation({ summary: 'Update one admin category' })
    @ApiResponse({ status: 200, type: AdminCategories })
    @Roles('1', '2')
    @UseGuards(RolesGuard)
    @Put(':id')
    replaceCategory(
        @Param('id') id: number,
        @Body() updateAdminCategories: UpdateAdminCategoriesDto,
    ) {
        return this.adminCategories.replaceAdminCategory(id, updateAdminCategories)
    }

    @ApiOperation({ summary: 'Delete admin category' })
    @ApiResponse({ status: 200, type: AdminCategories })
    @Roles('1', '2')
    @UseGuards(RolesGuard)
    @Delete(':id')
    destroy(@Param('id') id: number) {
        return this.adminCategories.delete(id);
    }
}
