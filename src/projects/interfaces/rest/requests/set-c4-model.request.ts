import z from 'zod';
import { createZodDto } from 'nestjs-zod';
import { NodeType } from '../../../domain/model/valueobjects/node-type';
import { ViewType } from '../../../domain/model/valueobjects/view-type';

const containerInfoSchema = z.object({
    name: z.string().min(1, 'Container name is required'),
    description: z.string().min(1, 'Container description is required'),
    technology: z.string().min(1, 'Container technology is required'),
});

const frainNodeSchema = z.object({
    id: z.string().min(1, 'Node ID is required'),
    type: z.enum(NodeType, {
        message: 'Node type is required',
    }),
    name: z.string().min(1, 'Node name is required'),
    description: z.string().min(1, 'Node description is required'),
    technology: z.string().min(1, 'Node technology is required'),
    viewId: z.string().nullable(),
    x: z.number(),
    y: z.number(),
});

const frainRelationSchema = z.object({
    sourceId: z.string().min(1, 'Source ID is required'),
    targetId: z.string().min(1, 'Target ID is required'),
    description: z.string().min(1, 'Relation description is required'),
    technology: z.string().optional(),
});

const frainViewSchema = z.object({
    id: z.string().min(1, 'View ID is required'),
    type: z.enum(ViewType, {
        message: 'View type is required',
    }),
    container: containerInfoSchema.nullable().optional(),
    name: z.string(),
    nodes: z.array(frainNodeSchema),
    externalNodes: z.array(frainNodeSchema),
    relations: z.array(frainRelationSchema),
});

const setC4ModelRequestSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    updatedAt: z.iso.date(),
    views: z.array(frainViewSchema),
});

export class SetC4ModelRequest extends createZodDto(setC4ModelRequestSchema) {}
